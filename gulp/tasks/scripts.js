const gulp = require('gulp')
const uglify = require('gulp-uglify')
const argv = require('yargs').argv
const webpack = require('webpack-stream')
const rename = require('gulp-rename')
const gulpif = require('gulp-if')

// Работа со скриптами

module.exports = function script() {
  return gulp.src(['dev/static/js/*.js', '!dev/static/js/*.min.js'])
    .pipe(webpack({
      mode: 'production',
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['@babel/env'],
              plugins: ['babel-plugin-root-import']
            }
          }
        ]
      }
    })).on('error', function handleError() {
      this.emit('end')
    })
    .pipe(rename('main.min.js'))
    .pipe(gulpif(argv.prod, uglify()))
    .pipe(gulp.dest('dist/static/js/'))
}
