
var gulp = require('gulp'),
    pug = require('gulp-pug'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass');
    browserSync = require('browser-sync');
    reload = browserSync.reload;
    autoprefixer = require('gulp-autoprefixer');
    concat = require('gulp-concat');



gulp.task('default', ['pug', 'sass', 'js', 'watch', 'serve', 'scssToCss', 'pugToHTML', 'sourceTojs', 'concatJs' ], function() {
    return gutil.log('Gulp is running!')
});

gulp.task('pug', function buildHTML() {
    return gulp.src('dev/**/*.pug')
        .pipe(pug({
            pretty: true
        }))      
        .pipe(gulp.dest('build'))
});


gulp.task('concatJs', function() {
    return gulp.src('dev/components/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dev/scripts'))
});

gulp.task('js', function() {
    return gulp.src('dev/scripts/main.js')
        .pipe(gulp.dest('build/scripts'))
});

gulp.task('sass', function() {
    return gulp.src('dev/css/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'))
});

gulp.task('css', function() {
    return gulp.src('dev/css/**/*.css')
        .pipe(gulp.dest('build/css'))
});

gulp.task('scssToCss', function() {
    return gulp.src('dev/components/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/components'))
});

gulp.task('pugToHTML', function() {
    return gulp.src('dev/components/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build/components'))
});

gulp.task('sourceTojs', function() {
    return gulp.src('dev/components/**/*.js')
        .pipe(gulp.dest('build/components'))
});


gulp.task('prefix', () =>
    gulp.src('build/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('build/css'))
);

// gulp.task('img', function () {
//     return gulp.src('dev/**/**/img/*')
//         .pipe(gulp.dest('build/img'))
// });

gulp.task('watch', function() {
    gulp.watch('dev/components/**/*.scss', ['scssToCss']);
    gulp.watch('dev/components/**/*.pug', ['pugToHTML']);
    gulp.watch('dev/components/**/*.js', ['concatJs']);

    gulp.watch('dev/components/**/*.js', ['sourceTojs']);    

    gulp.watch('dev/**/*.pug', ['pug'])
    gulp.watch('dev/**/*.scss', ['sass']);

    gulp.watch('build/css/*.css', ['prefix']);

    gulp.watch('dev/**/*.js', ['js']);
    // gulp.watch('dev/img/*', ['img']);

    gulp.watch('dev/css/**/*.css', ['css']);

})

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: 'build'
            },
        notify: false
        
});

gulp.watch(['**/*.html', 'css/**/*.css', 'scripts/**/*.js'], {cwd: 'build'}, reload);
});

gulp.task('build', ['pug', 'sass', 'js', 'css', 'prefix', 'scssToCss', 'pugToHTML', 'sourceTojs', 'concatJs']);