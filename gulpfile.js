var gulp         = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    plumber      = require('gulp-plumber'), //предохраняет задачи от остановки во время их выполнения
    pug          = require('gulp-pug'), //Подключаем шаблонизатор для html PUG(jade)
    notify       = require("gulp-notify"), // Подключаем плагин для вывода ошибок
    spritesmith  = require("gulp.spritesmith"), // Подключаем модуль для сборки спрайтов
    newer        = require("gulp-newer");

// Работа со SASS(SASS)
gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src(['app/sass/**/main.sass', 'app/sass/**/libs.sass']) // 'app/sass/**/*.sass', Берем источник
        .pipe(plumber())
        .pipe(sass({outputStyle: 'expanded'})).on("error", notify.onError(function(error) {
            return "Message to the notifier: " + error.message;
        })) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({
            stream: true
        })); // Обновляем CSS на странице при изменении
});

// Работа со CSS
// gulp.task('sass', function(){ // Создаем таск css
//     return gulp.src('app/css/**/*.css') // Берем источник
//         .pipe(plumber())
//         .pipe(sass({outputStyle: 'expanded'})).on("error", notify.onError(function(error) {
//             return "Message to the notifier: " + error.message;
//           }))  // Преобразуем Sass в CSS посредством gulp-sass
//         .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
//         .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
//         .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
// });

// Работа с Pug
gulp.task('pug', function() {
    return gulp.src('app/pug/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .on("error", notify.onError(function(error) {
            return "Message to the notifier: " + error.message;
        }))
        .pipe(gulp.dest('app'));
});

// Browsersync
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
    notify: false
    });
});

// Работа с JS
gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/libs/slick/slick.min.js' // slickslider
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')) // Выгружаем в папку app/js
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Сборка спрайтов PNG
gulp.task('cleansprite', function() {
    return del.sync('app/img/sprite/sprite.png');
});

gulp.task('spritemade', function() {
    var spriteData =
        gulp.src('app/img/sprite/*.*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.sass',
            padding: 15,
            cssFormat: 'sass',
            algorithm: 'binary-tree', 
            //  algorithm: top-down left-right diagonal alt-diagonal binary-tree
            cssTemplate: 'handlebarsInheritance.sass.handlebars',
            cssVarMap: function(sprite) {
                sprite.name = 's-' + sprite.name;
            }
        }));

    spriteData.img.pipe(gulp.dest('app/img/sprite/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('app/sass/')); // путь, куда сохраняем стили
});
gulp.task('sprite', ['cleansprite', 'spritemade']);

gulp.task('coommon-scripts', function() {
    return gulp.src([ // сжимаем common js
        'app/js/common.js'
        ])
        .pipe(plumber())
        .pipe(concat('common.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css') // Выбираем файл для минификации
        .pipe(plumber())
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('css-main', ['sass'], function() {
    return gulp.src('app/css/main.css') // сжимаем main css
        .pipe(plumber())
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('watch', ['browser-sync', 'css-libs', 'css-main', 'scripts'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/pug/**/*.pug', ['pug']); // Наблюдение за PUG файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
    gulp.watch('app/css/**/*.css', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'sass', 'coommon-scripts', 'scripts'], function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/css/main.css',
        'app/css/libs.css',
        'app/css/libs.min.css',
        'app/css/main.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

    var buildImg = gulp.src('app/img/sprite/sprite.png')
    .pipe(imagemin({
        progressive: true,
        use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/img/sprite/'));

});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);