const  { src, dest } = require('gulp');
const imagemin = require('gulp-imagemin');

// Сжимаю картинки

module.exports.image = function() {
  return src('./public/images/*')
    .pipe(imagemin())
    .pipe(dest('./public/images_min'))
};

module.exports.image.displayName = 'Imagetask';