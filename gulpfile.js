const  { src, dest, parallel, watch, series } = require('gulp');

const connect = require('gulp-connect');

const webpack = require('webpack-stream');
const TerserPlugin = require('terser-webpack-plugin');

const requireDir = require('require-dir');
const tasks = requireDir('./tasks');
const templates = tasks.templatesTask.template;
const serveTask = tasks.serverTask.server;
const style = tasks.stylesTask.style;
const styleDebug = tasks.stylesTask.styleDebug;
const image = tasks.imagesTask.image;
const client = tasks.archivesTask.client;
const project = tasks.archivesTask.project;
const validate = tasks.validateTask.validate;

// JS

let webpackConfig = {
  output: {
    filename: 'main.js'
  },
  optimization: {
    minimize: true,
    // minimizer: [new TerserPlugin({
    //   cache: true,
    //   extractComments: true,
    //   terserOptions: {
    //     output: {
    //       comments: false,
    //     },
    //     extractComments: 'all',
    //     compress: {
    //       drop_console: false,
    //     },
    //   },
    // })],
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



// Просмотр файлов
function watcher() {
  watch('./src/templates/*/*.twig', templates);
  watch('./src/styles/*/*.scss', style);
  watch('./src/scripts/*.js', scripts);
}

// Задачи для сборки

exports.template = templates;
exports.style = style;
exports.scripts = scripts;

// Для отладки стилей

exports.styleDebug = styleDebug;

// Минимизирую картинки

exports.image = image;

// Общая сборка

build = parallel(templates, style, scripts);
exports.build = build;

// Служебные функции, для создания архтвов
exports.project = project;
exports.client = client;
archives = parallel(client, project);
exports.archives = archives;

//Валидация
exports.validate = validate;

exports.default = series(build, parallel(watcher, serveTask));
