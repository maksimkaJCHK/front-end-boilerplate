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
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});
gulp.task('styleCompile', function () {
  gulp.src('styles/main.scss')
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
    .pipe(gulp.dest('public/css/min'))
    .pipe(connect.reload());
});
gulp.task('js-compile', function() {
  gulp.src('js-concat/ES6/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('js-concat'))
    .pipe(connect.reload());
});
gulp.task('js', function() {
  gulp.src([
    'js-concat/libraries/_jquery-2.2.4.min.js',
    'js-concat/plugins/*.js',
    'js-concat/main-function.js',
    'js-concat/main.js'
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
  gulp.src('templates/pages/index.twig')
  .pipe(twig({
    data: {
      title: 'Главная страница'
    }
  }))
  .pipe(prettify({indent_size: 2}))
  .pipe(gulp.dest('public/'))
  .pipe(connect.reload());
});

gulp.task('image', function () {
  gulp.src(['public/images/*', 'public/images/*/*'])
  .pipe(imagemin())
  .pipe(gulp.dest('public/images_compresed'))
});

gulp.task('default', function() {
  gulp.run('styleCompile');
  gulp.run('js-compile');
  gulp.run('js');
  gulp.run('templateCompile');
  gulp.run('connect');
  
  gulp.watch('styles/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('styles/base/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('styles/services/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('styles/settings/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('styles/feb/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('styles/layout/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('styles/pages/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('styles/components/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('styles/plugins/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('styles/media/**', function(event) {
    gulp.run('styleCompile');
  });
  gulp.watch('styles/media/grid/**', function(event) {
    gulp.run('styleCompile');
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

  gulp.watch('templates/pages/**', function(event) {
    gulp.run('templateCompile');
  });
  gulp.watch('templates/performance/**', function(event) {
    gulp.run('templateCompile');
  });
  gulp.watch('templates/structure/**', function(event) {
    gulp.run('templateCompile');
  });
  gulp.watch('templates/layout/**', function(event) {
    gulp.run('templateCompile');
  });
  gulp.watch('templates/components/**', function(event) {
    gulp.run('templateCompile');
  });
  gulp.watch('templates/macros/**', function(event) {
    gulp.run('templateCompile');
  });
})
