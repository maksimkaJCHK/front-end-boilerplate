var gulp = require('gulp');  
var concat = require('gulp-concat');
var watch = require('gulp-watch'); 
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cleanCSS  = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var twig = require('gulp-twig');
var imagemin = require('gulp-imagemin');
var compress = require('gulp-yuicompressor');
var prettify = require('gulp-jsbeautifier');
var base64 = require('gulp-base64');
var babel = require('gulp-babel');

gulp.task('sass', function () {
  gulp.src('scss/main.scss')
    .pipe(plumber())
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer({
        "browsers": ["last 10 versions", "ie 8", "ie 7"],
        "cascade": true
    }))
    .pipe(base64({
      baseDir: 'encodeImg/',
      extensions: ['svg', 'png', 'jpg'],
      maxImageSize: 400*1024,
      deleteAfterEncoding: false,
      debug: false
    }))
    .pipe(gulp.dest('public/css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/css/min'));
});
gulp.task('js-compile', function() {
  gulp.src('js-concat/ES6/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('js-concat'));
});
gulp.task('js', function() {
  gulp.src([
    'js-concat/libraries/_jquery-2.2.4.min.js',
    'js-concat/plugins/*.js',
    'js-concat/main-function.js',
    'js-concat/main.js'
  ])
  .pipe(concat('main.js'))
  .pipe(gulp.dest('public/js'))
  .pipe(uglify())
  .pipe(compress({
    type: 'js'
  }))
  .pipe(gulp.dest('public/js/min'))
});
gulp.task('twig', function () {
  'use strict';
  gulp.src('twig/index.twig')
  .pipe(twig({
    data: {
      title: 'Главная страница'
    }
  }))
  .pipe(prettify({indent_size: 2}))
  .pipe(gulp.dest('public/'));
});

gulp.task('image', function () {
  gulp.src(['public/images/*', 'public/images/*/*'])
  .pipe(imagemin())
  .pipe(gulp.dest('public/images_compresed'))
});

gulp.task('default', function() {
  gulp.run('sass');
  gulp.run('js-compile');
  gulp.run('js');
  gulp.run('twig');
  
  gulp.watch('scss/**', function(event) {
    gulp.run('sass');
  });
  gulp.watch('scss/base/**', function(event) {
    gulp.run('sass');
  });
  gulp.watch('scss/services/**', function(event) {
    gulp.run('sass');
  });
  gulp.watch('scss/settings/**', function(event) {
    gulp.run('sass');
  });
  gulp.watch('scss/feb/**', function(event) {
    gulp.run('sass');
  });
  gulp.watch('scss/layout/**', function(event) {
    gulp.run('sass');
  });
  gulp.watch('scss/pages/**', function(event) {
    gulp.run('sass');
  });
  gulp.watch('scss/components/**', function(event) {
    gulp.run('sass');
  });
  gulp.watch('scss/plugins/**', function(event) {
    gulp.run('sass');
  });
  gulp.watch('scss/media/**', function(event) {
    gulp.run('sass');
  });
  gulp.watch('scss/media/grid/**', function(event) {
    gulp.run('sass');
  });
  
  gulp.watch('js-concat/ES6/**', function(event) {
    gulp.run('js-compile');
  });

  gulp.watch('js-concat/libraries/**', function(event) {
    gulp.run('js');
  });
  gulp.watch('js-concat/plugins/**', function(event) {
    gulp.run('js');
  });
  gulp.watch('js-concat/**', function(event) {
    gulp.run('js');
  });

  gulp.watch('twig/**', function(event) {
    gulp.run('twig');
  });
  gulp.watch('twig/performance/**', function(event) {
    gulp.run('twig');
  });
  gulp.watch('twig/structure/**', function(event) {
    gulp.run('twig');
  });
  gulp.watch('twig/layout/**', function(event) {
    gulp.run('twig');
  });
  gulp.watch('twig/components/**', function(event) {
    gulp.run('twig');
  });
  gulp.watch('twig/macros/**', function(event) {
    gulp.run('twig');
  });
})
