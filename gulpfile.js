const  { src, dest, parallel, watch, series } = require('gulp');

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
  watch('./src/templates/*/*.twig', templates);
  watch('./src/styles/*/*.scss', style);
  watch('./src/scripts/*.js', scripts);
}

function watcherDebug() {
  watch('./src/templates/*/*.twig', templates);
  watch('./src/styles/*/*.scss', styleDebug);
  watch('./src/scripts/*.js', scriptsDebug);
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

// Сборка с sourceMap для стилей и скрипто, консоль логи вырезать не буду

buildDev = parallel(templates, styleDebug, scriptsDebug);
exports.buildDev = buildDev;

// Служебные функции, для создания архтвов
exports.project = project;
exports.client = client;
archives = parallel(client, project);
exports.archives = archives;

//Валидация
exports.validate = validate;

exports.default = series(build, parallel(watcher, serveTask));
exports.dev = series(buildDev, parallel(watcherDebug, serveTask));
