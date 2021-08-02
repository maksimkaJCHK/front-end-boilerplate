const  { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const base64 = require('gulp-css-base64');
const sourcemaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');
sass.compiler = require('node-sass');

// Компилирую стили

module.exports.style = function() {
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

module.exports.style.displayName = 'StyleTask';

module.exports.styleDebug = function() {
  return src('./src/styles/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  // .pipe(autoprefixer({
  //   cascade: false,
  //   overrideBrowserslist: ['last 2 versions']
  // }))
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

module.exports.styleDebug.displayName = 'StyleDebugTask';