const  { src, dest } = require('gulp');
const twig = require('gulp-twig');
const beautify = require('gulp-beautify');
const connect = require('gulp-connect');

// Компилирую шаблоны

module.exports.template = function() {
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

module.exports.template.displayName = 'TemplateTask';