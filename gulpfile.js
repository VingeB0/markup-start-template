var gulp       = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglifyjs'),
	cssnano      = require('gulp-cssnano'),
	rename       = require('gulp-rename'),
	del          = require('del'),
	autoprefixer = require('gulp-autoprefixer'),
	plumber      = require('gulp-plumber'),
	pug          = require('gulp-pug'),
	notify       = require("gulp-notify"),
	spritesmith  = require("gulp.spritesmith"),
	csscomb      = require('gulp-csscomb'),
	sourcemaps	 = require('gulp-sourcemaps'),
	svgSprite		 = require('gulp-svg-sprite'),
	svgmin 		 	 = require('gulp-svgmin'),
	replace 		 = require('gulp-replace'),
	cheerio 		 = require('gulp-cheerio');

gulp.task('sass', function(){
	return gulp.src(['app/sass/**/main.sass'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'}))
		.on("error", notify.onError(function(error) {
			return {
				title: 'Sass',
				message: error.message
			};
		}))
		.pipe(autoprefixer(['last 4 versions'], { cascade: true }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('pug', function() {
	return gulp.src('app/pug/pages/*.pug')
		.pipe(plumber())
		.pipe(pug({
			pretty: true
		}))
		.on("error", notify.onError(function(error) {
			return {
				title: 'Pug',
				message: error.message
			};
		}))
		.pipe(gulp.dest('app'))
		.on('end', browserSync.reload);
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
	notify: false
	});
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/slick/slick.min.js',
		'app/libs/svg4everybody/svg4everybody.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('cleansprite', function() {
	return del.sync('app/img/pngSprite/sprite.png');
});

gulp.task('pngSpriteBuild', function() {
	var spriteData =
		gulp.src('app/img/pngSprite/*.*')
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: 'pngSprite.sass',
			padding: 15,
			cssFormat: 'sass',
			algorithm: 'binary-tree', 
			cssTemplate: 'handlebarsInheritance.sass.handlebars',
			cssVarMap: function(sprite) {
				sprite.name = 's-' + sprite.name;
			}
		}));

	spriteData.img.pipe(gulp.dest('app/img/pngSprite/'));
	spriteData.css.pipe(gulp.dest('app/sass/'));
});
gulp.task('pngSprite', ['cleansprite', 'pngSpriteBuild']);

gulp.task('svgSpriteBuild', function () {
	return gulp.src('./app/img/svgSprite/*.svg')
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		.pipe(replace('&gt;', '>'))
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "sprite.svg"
				}
			}
		}))
		.pipe(gulp.dest('./app/img/svgSprite/'));
});
gulp.task('svgSprite', ['svgSpriteBuild']);

gulp.task('coommon-scripts', function() {
	return gulp.src([
		'app/js/common.js'
		])
		.pipe(plumber())
		.pipe(concat('common.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

gulp.task('css-main', ['sass'], function() {
	return gulp.src('app/css/main.css')
		.pipe(plumber())
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['browser-sync', 'css-main', 'scripts'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/pug/**/*.pug', ['pug']);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'img', 'sass', 'coommon-scripts', 'scripts'], function() {

	var buildCssMainMin = gulp.src([
		'app/css/main.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildMainCssComb = gulp.src([
		'app/css/main.css'
		])
  .pipe(csscomb())
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	var buildSvg = gulp.src('app/img/svgSprite/symbol/sprite.svg')
	.pipe(gulp.dest('dist/img/svgSprite/symbol'))

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

	var buildImg = gulp.src('app/img/sprite/sprite.png')
	.pipe(gulp.dest('dist/img/sprite/'));
});

gulp.task('default', ['watch']);