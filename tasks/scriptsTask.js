const { src, dest } = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const connect = require('gulp-connect');

module.exports.scripts = function() {
  return src('./src/scripts/main.js')
    .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
    .pipe(dest('./public/js'))
    .pipe(connect.reload());
}

module.exports.scripts.displayName = 'ScriptsTask';

module.exports.scriptsDebug = function() {
  return src('./src/scripts/main.js')
    .pipe(gulpWebpack(require('./webpack.debug.config.js'), webpack))
    .pipe(dest('./public/js'))
    .pipe(connect.reload());
}

module.exports.scriptsDebug.displayName = 'ScriptsDebugTask';