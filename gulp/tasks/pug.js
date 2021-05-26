const gulp = require('gulp');
const htmlValidator = require('gulp-w3c-html-validator');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const fs = require('fs');

let dataFromJson;
if(argv.prod) {
    dataFromJson = JSON.parse(fs.readFileSync('./manifest.json'))
    dataFromJson.styles = dataFromJson['styles.css'];
    delete dataFromJson['styles.css'];
    fs.writeFileSync("manifest.json", JSON.stringify(dataFromJson, null, 4));
}

// Преобразуем Pug в HTML
module.exports = function pug2html() {
  return gulp.src('dev/pug/*.pug')
    .pipe(plumber())
    .pipe(gulpif(argv.prod, pug({
      pretty: true,
      locals: dataFromJson || {}
    }), pug({pretty: true})))
    .pipe(plumber.stop())
    .pipe(gulpif(argv.prod, htmlValidator()))
    .pipe(gulp.dest('dist'))
};
