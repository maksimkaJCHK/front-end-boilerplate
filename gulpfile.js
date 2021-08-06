const  { parallel, watch, series } = require('gulp');

const requireDir = require('require-dir');
const tasks = requireDir('./tasks');
const templates = tasks.templatesTask.template;
const serveTask = tasks.serverTask.server;
const style = tasks.stylesTask.style;
const styleDebug = tasks.stylesTask.styleDebug;
const image = tasks.imagesTask.image;
const client = tasks.archivesTask.client;
const project = tasks.archivesTask.project;
const validate = tasks.validateTask.validate;
const scripts = tasks.scriptsTask.scripts;
const scriptsDebug = tasks.scriptsTask.scriptsDebug;

// Просмотр файлов

function watcher() {
  // Просматриваю папку с шаблонами
  watch('./src/templates/*/*/*.twig', templates);
  watch('./src/templates/*/*.twig', templates);
  // Просматриваю папку со стилями
  watch('./src/styles/*/*/*.scss', style);
  watch('./src/styles/*/*.scss', style);
  watch('./src/styles/*.scss', style);
  // Просматриваю папку со скриптами, я вполне возможно помимо скриптов буду подключать .less, .scss, .css файты
  watch('./src/scripts/*/*/*.css', scripts);
  watch('./src/scripts/*/*.css', scripts);
  watch('./src/scripts/*.css', scripts);
  // .scss
  watch('./src/scripts/*/*/*.scss', scripts);
  watch('./src/scripts/*/*.scss', scripts);
  watch('./src/scripts/*.scss', scripts);
  // .less
  watch('./src/scripts/*/*/*.less', scripts);
  watch('./src/scripts/*/*.less', scripts);
  watch('./src/scripts/*.less', scripts);
  // .js
  watch('./src/scripts/*/*/*.js', scripts);
  watch('./src/scripts/*/*.js', scripts);
  watch('./src/scripts/*.js', scripts);
}

function watcherDebug() {
  // Просматриваю папку с шаблонами
  watch('./src/templates/*/*/*.twig', templates);
  watch('./src/templates/*/*.twig', templates);
  // Просматриваю папку со стилями
  watch('./src/styles/*/*/*.scss', styleDebug);
  watch('./src/styles/*/*.scss', styleDebug);
  watch('./src/styles/*.scss', styleDebug);
  // Просматриваю папку со скриптами, я вполне возможно помимо скриптов буду подключать .less, .scss, .css файты
  watch('./src/scripts/*/*/*.css', scriptsDebug);
  watch('./src/scripts/*/*.css', scriptsDebug);
  watch('./src/scripts/*.css', scriptsDebug);
  // .scss
  watch('./src/scripts/*/*/*.scss', scriptsDebug);
  watch('./src/scripts/*/*.scss', scriptsDebug);
  watch('./src/scripts/*.scss', scriptsDebug);
  // .less
  watch('./src/scripts/*/*/*.less', scriptsDebug);
  watch('./src/scripts/*/*.less', scriptsDebug);
  watch('./src/scripts/*.less', scriptsDebug);
  // .js
  watch('./src/scripts/*/*/*.js', scriptsDebug);
  watch('./src/scripts/*/*.js', scriptsDebug);
  watch('./src/scripts/*.js', scripts);
}

// Задачи для сборки

exports.template = templates;
exports.style = style;
exports.scripts = scripts;

// Для отладки стилей

exports.styleDebug = styleDebug;

// Минимизирую картинки

exports.image = image;

// Общая сборка

build = parallel(templates, style, scripts);
exports.build = build;

// Сборка с sourceMap для стилей и скриптов, консоль логи вырезать не буду

buildDev = parallel(templates, styleDebug, scriptsDebug);
exports.buildDev = buildDev;

// Служебные функции, для создания архтвов
exports.project = project;
exports.client = client;
archives = parallel(client, project);
exports.archives = archives;

// Валидация
exports.validate = validate;

// Задачи для разработки и отладки
exports.default = series(build, parallel(watcher, serveTask));
exports.dev = series(buildDev, parallel(watcherDebug, serveTask));
