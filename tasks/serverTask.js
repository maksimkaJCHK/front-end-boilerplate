const connect = require('gulp-connect');

// Сервер
module.exports.server = function(done) {
  connect.server({
    root: 'public',
    livereload: true,
    port: 8080,
  }, function () {
    this.server.on('close', done)
  });
};

module.exports.server.displayName = 'ServerTask';