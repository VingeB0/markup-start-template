const plumber = require('gulp-plumber'),
      scss = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      csso = require('gulp-csso'),
      csscomb = require('gulp-csscomb'),
      sourcemaps = require('gulp-sourcemaps'),
      rename = require('gulp-rename'),
      stylesPATH = {
          "input": "./dev/static/styles/",
          "output": "./build/static/css/"
      };

module.exports = function () {
    $.gulp.task('styles:dev', () => {
        return $.gulp.src(stylesPATH.input + 'styles.sass')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(scss())
            .pipe(autoprefixer({
                 overrideBrowserslist:  ['last 3 versions']
            }))
            .pipe(sourcemaps.write())
            .pipe(rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.output))
            .on('end', $.browserSync.reload);
    });
    $.gulp.task('styles:build', () => {
        return $.gulp.src(stylesPATH.input + 'styles.sass')
            .pipe(scss())
            .pipe(autoprefixer({
                 overrideBrowserslist:  ['last 3 versions']
            }))
            .pipe(autoprefixer())
            .pipe(csscomb())
            .pipe(rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.output))
    });
    $.gulp.task('styles:build-min', () => {
        return $.gulp.src(stylesPATH.input + 'styles.sass')
            .pipe(scss())
            .pipe(autoprefixer())
            .pipe(csscomb())
            .pipe(csso())
            .pipe(rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.output))
    });
};
