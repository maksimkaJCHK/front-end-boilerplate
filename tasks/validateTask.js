const  { src, dest } = require('gulp');
const htmlv = require('gulp-html-validator');

// Валидация

module.exports.validate = function()  {
  return src('./public/*.html')
    .pipe(htmlv())
    .pipe(dest('./validateResult'));
}

module.exports.validate.displayName = 'ValidateTask';