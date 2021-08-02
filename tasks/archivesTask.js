const  { src, dest } = require('gulp');
const zip = require('gulp-zip');

// Созzдаю архивы

module.exports.client = function() {
  return src([
    'public/**',
  ])
  .pipe(zip('mailProject.zip'))
  .pipe(dest('archive'))
};

module.exports.client.displayName = 'clientTask';

module.exports.project = function() {
  return src([
      '**',
      '!node_modules', '!node_modules/**',
    ])
    .pipe(zip('project.zip'))
    .pipe(dest('./archive'));
};

module.exports.project.displayName = 'projectTask';