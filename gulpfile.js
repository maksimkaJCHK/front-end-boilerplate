const gulp = require('gulp');  
const concat = require('gulp-concat');
const watch = require('gulp-watch'); 
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const cleanCSS  = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const twig = require('gulp-twig');
const imagemin = require('gulp-imagemin');
const compress = require('gulp-yuicompressor');
const prettify = require('gulp-jsbeautifier');
const base64 = require('gulp-base64');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const gcmq = require('gulp-group-css-media-queries');

const eslint = require('gulp-eslint');
const htmlhint = require("gulp-htmlhint");

const zip = require('gulp-zip');

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});
gulp.task('styleCompile', function () {
  gulp.src('front-end/styles/main.scss')
    .pipe(plumber())
    .pipe(sass({errLogToConsole: true}))
    .pipe(gcmq())
    .pipe(autoprefixer({
        "browsers": ["last 5 versions"],
        "cascade": true
    }))
    .pipe(base64({
      baseDir: 'front-end/',
      extensions: ['svg', 'png', 'jpg'],
      maxImageSize: 400*1024,
      deleteAfterEncoding: false,
      debug: false
    }))
    .pipe(gulp.dest('public/css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/css/min'))
    .pipe(connect.reload());
});
gulp.task('js-compile', function() {
  gulp.src('front-end/js-concat/ES6/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('js-concat'))
    .pipe(connect.reload());
});
gulp.task('js', function() {
  gulp.src([
    'front-end/js-concat/libraries/_jquery-2.2.4.min.js',
    'front-end/js-concat/plugins/*.js',
    'front-end/js-concat/main-function.js',
    'front-end/js-concat/main.js'
  ])
  .pipe(plumber())
  .pipe(concat('main.js'))
  .pipe(gulp.dest('public/js'))
  .pipe(uglify())
  .pipe(compress({
    type: 'js'
  }))
  .pipe(gulp.dest('public/js/min'))
  .pipe(connect.reload());
});
gulp.task('templateCompile', function () {
  'use strict';
  gulp.src('front-end/templates/pages/index.twig')
  .pipe(twig({
    data: {
      title: 'Главная страница'
    }
  }))
  .pipe(prettify({indent_size: 2}))
  .pipe(gulp.dest('public/'))
  .pipe(connect.reload());
});

gulp.task('lint', function () {
  gulp.src(['public/js/main.js'])
  .pipe(eslint({
    rules: {
      'my-custom-rule': 1,
      'strict': 2
    },
    globals: [
      'jQuery',
      '$'
    ],
    envs: [
      'browser'
    ]
  }))
  .pipe(eslint.formatEach('compact', process.stderr));
});

gulp.task('html', function () {
  gulp.src("public/*.html")
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
});

gulp.task('arhive', function () {
  gulp.src(['public/*', 'public/*/*', 'public/*/*/*'])
    .pipe(zip('project.zip'))
    .pipe(gulp.dest('arhive'))
});

gulp.task('image', function () {
  gulp.src(['front-end/public/images/*', 'front-end/public/images/*/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('public/images_compresed'))
});

gulp.task('test', function () {
  gulp.run('lint');
  gulp.run('html');
});

gulp.task('default', function() {
  gulp.run('styleCompile');
  gulp.run('js-compile');
  gulp.run('js');
  gulp.run('templateCompile');
  gulp.run('connect');
  
  gulp.watch('front-end/styles/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('front-end/styles/base/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('front-end/styles/services/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('front-end/styles/settings/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('front-end/styles/feb/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('front-end/styles/layout/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('front-end/styles/pages/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('front-end/styles/components/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('front-end/styles/plugins/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('front-end/styles/media/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('front-end/styles/media/grid/**', function(event) {
    gulp.run('styleCompile');
  });
  
  gulp.watch('front-end/js-concat/ES6/**', function(event) {
    gulp.run('js-compile');
  });

  gulp.watch('front-end/js-concat/libraries/**', function(event) {
    gulp.run('js');
  });
  gulp.watch('front-end/js-concat/plugins/**', function(event) {
    gulp.run('js');
  });
  gulp.watch('front-end/js-concat/**', function(event) {
    gulp.run('js');
  });

  gulp.watch('front-end/templates/pages/**', function(event) {
    gulp.run('templateCompile');
  });
  gulp.watch('front-end/templates/performance/**', function(event) {
    gulp.run('templateCompile');
  });
  gulp.watch('front-end/templates/structure/**', function(event) {
    gulp.run('templateCompile');
  });
  gulp.watch('front-end/templates/layout/**', function(event) {
    gulp.run('templateCompile');
  });
  gulp.watch('front-end/templates/components/**', function(event) {
    gulp.run('templateCompile');
  });
  gulp.watch('front-end/templates/macros/**', function(event) {
    gulp.run('templateCompile');
  });
});