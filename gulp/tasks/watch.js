module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch('./dev/pug/**/*.pug', {usePolling: true}, $.gulp.series('pug'));
        $.gulp.watch('./dev/static/styles/**/*.sass', {usePolling: true}, $.gulp.series('styles:dev'));
        $.gulp.watch(['./dev/static/images/general/**/*.{png,jpg,gif,svg}',
            './dev/static/images/content/**/*.{png,jpg,gif,svg}'], {usePolling: true}, $.gulp.series('img:dev'));
        $.gulp.watch('./dev/static/images/svg/*.svg', {usePolling: true}, $.gulp.series('svg'));
        $.gulp.watch('./dev/static/js/**/*.js', {usePolling: true}, $.gulp.series('js:dev'));
    });
};
