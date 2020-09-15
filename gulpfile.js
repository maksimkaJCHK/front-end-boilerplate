const  { src, dest, parallel, watch, series } = require('gulp');
const twig = require('gulp-twig');
const beautify = require('gulp-beautify');
const sass = require('gulp-sass');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const base64 = require('gulp-css-base64');
const sourcemaps = require('gulp-sourcemaps');
const  connect = require('gulp-connect');
const htmlv = require('gulp-html-validator');
const zip = require('gulp-zip');
const imagemin = require('gulp-imagemin');
const webpack = require('webpack-stream');
const TerserPlugin = require('terser-webpack-plugin');
sass.compiler = require('node-sass');

// Валидация
function validate()  {
  return src('./public/*.html')
    .pipe(htmlv())
    .pipe(dest('./validateResult'));
}

// JS

let webpackConfig = {
  output: {
    filename: 'main.js'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      cache: true,
      extractComments: true,
      terserOptions: {
        output: {
          comments: false,
        },
        extractComments: 'all',
        compress: {
          drop_console: true,
        },
      },
    })],
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ["babel-loader"]
      }, {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              config: {path: 'postcss.config.js'},
            }
          }
        ]
      }, {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {config: {
              path: './postcss.config.js'
            }}
          },
          "sass-loader"
        ]
      }, {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              esModule: false,
            },
          },
        ],
      }
    ]
  },
  mode: 'production',
};

function scripts() {
  return src('./src/scripts/main.js')
  .pipe(webpack(webpackConfig))
  .pipe(dest('./public/js'))
  .pipe(connect.reload());
}

// Сжимаю картинки
function image() {
  return src('./public/images/*')
    .pipe(imagemin(
      [
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
          plugins: [
            {removeViewBox: false},
            {cleanupIDs: false}
          ]
        })
      ]
    ))
    .pipe(dest('./public/images_min'))
};
// Созzдаю архивы
function client() {
  return src([
    'public/**',
  ])
  .pipe(zip('mailProject.zip'))
  .pipe(dest('archive'))
};

function project() {
  return src([
      '**',
      '!node_modules', '!node_modules/**',
    ])
    .pipe(zip('project.zip'))
    .pipe(dest('./archive'));
};

// Сервер
function serveTask(done) {
  connect.server({
    root: 'public',
    livereload: true,
    port: 8080,
  }, function () {
    this.server.on('close', done)
  });
}

// Компилирую шаблоны

function template() {
  return src('./src/templates/pages/index.twig')
    .pipe(twig({
      data: {
        title: 'Главная страница',
      }
    }))
    .pipe(beautify.html({ indent_size: 2, "max_preserve_newlines": 0 }))
    .pipe(dest('./public'))
    .pipe(connect.reload());
}

// Компилирую стили
function style() {
  return src('./src/styles/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    cascade: false,
    overrideBrowserslist: ['last 2 versions']
  }))
  .pipe(base64({
    baseDir: 'src',
    maxWeightResource: 32768,
    extensionsAllowed: ['.gif', '.jpg', '.png']
  }))
  .pipe(gcmq())
  .pipe(dest('./public/css'))
  .pipe(cleanCSS({
    level: 1
  }))
  .pipe(dest('./public/css/min'))
  .pipe(connect.reload());
}

function styleDebug() {
  return src('./src/styles/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    cascade: false,
    overrideBrowserslist: ['last 2 versions']
  }))
  .pipe(base64({
    baseDir: 'src',
    maxWeightResource: 32768,
    extensionsAllowed: ['.gif', '.jpg', '.png']
  }))
  //.pipe(gcmq())
  .pipe(sourcemaps.write('./', {
    includeContent: true,
    sourceRoot: '../../src/styles/',
  }))
  .pipe(dest('./public/css'))
  .pipe(cleanCSS({
    level: 1
  }))
  .pipe(dest('./public/css/min'))
  .pipe(connect.reload());
}


// Просмотр файлов
function watcher() {
  watch('./src/templates/*/*.twig', template);
  watch('./src/styles/*/*.scss', style);
  watch('./src/scripts/*.js', scripts);
}

// Задачи для сборки
exports.template = template;
exports.style = style;
exports.scripts = scripts;
// Для отладки стилей
exports.styleDebug = styleDebug;

// Минимизирую картинки
exports.image = image;

// Общая сборка
build = parallel(template, style, scripts);
exports.build = build;

// Служебные функции
exports.project = project;
exports.client = client;

//Валидация
exports.validate = validate;

exports.default = series(build, parallel(watcher, serveTask));
