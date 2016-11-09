var gulp = require('gulp');  
var concat = require('gulp-concat');
var watch = require('gulp-watch'); 
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cleanCSS  = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var twig = require('gulp-twig');

gulp.task('sass', function () {
  gulp.src('scss/main.scss')
    .pipe(plumber())
    .pipe(sass({errLogToConsole: true}))
    // .pipe(autoprefixer({
    //     "browsers": ["last 10 versions", "ie 8", "ie 7"],
    //     "cascade": true
    // }))
    // .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('project/css'));
});
gulp.task('scripts', function() {
  gulp.src(['js-concat/libraries/*.js', 'js-concat/plugins/*.js', 'js-concat/main-function.js', 'js-concat/main.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('project/js'))
    .pipe(uglify())
    .pipe(gulp.dest('project/js/min'))
});
gulp.task('twig', function () {
  'use strict';
  gulp.src('twig/index.twig')
  .pipe(twig({
    data: {
      title: 'Главная страница',
      fullFooter: false
    }
  }))
  .pipe(gulp.dest('project/'));
});
gulp.task('default', function() {
  gulp.run( 'sass');
  gulp.run( 'scripts');
  gulp.run( 'twig');
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
  gulp.watch('scss/modules/**', function(event) {
    gulp.run('sass');
  });
  gulp.watch('scss/plugins/**', function(event) {
    gulp.run('sass');
  });
  gulp.watch('js-concat/libraries/**', function(event) {
    gulp.run('scripts');
  });
  gulp.watch('js-concat/plugins/**', function(event) {
    gulp.run('scripts');
  });
  gulp.watch('js-concat/**', function(event) {
    gulp.run('scripts');
  });
  gulp.watch('twig/**', function(event) {
    gulp.run('twig');
  });
})
