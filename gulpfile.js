var gulp = require('gulp');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var jsuglify = require('gulp-uglify');
var typescript = require('gulp-typescript');
var tslint = require('gulp-tslint');
var tsProject = typescript.createProject('tsconfig.json');
var concatCss = require('gulp-concat-css');

const tscConfig = require('./tsconfig.json');

//var cssProd = 'css/';
var appDev = 'dev/';
var appProd = 'app/';
var appView = 'view/';
var appStyles = 'style/';

gulp.task('tslint', function () {
    return gulp.src(appDev + '**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report("verbose"));
});

gulp.task('clean-app', function () {
    return del(appProd + '**/*');
});

gulp.task('clean-view', function () {
    return del(appView + '**/*');
});


// TypeScript compile
gulp.task('build-ts', ['clean-app', 'tslint'], function () {
    return gulp
        .src(appDev + '**/*.ts')
        .pipe(sourcemaps.init())          // <--- sourcemaps
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write('.'))      // <--- sourcemaps
        .pipe(gulp.dest(appProd));
});

// HTML and CSS
gulp.task('build-html', ['clean-view'], function () {
    return gulp.src(appDev + '**/*.html')
        .pipe(gulp.dest(appView));
});

gulp.task('build-css', function () {
    return gulp.src(appDev + '**/*.css')
        .pipe(concatCss('style.min.css'))
        .pipe(gulp.dest(appStyles));
});

gulp.task('watch', function () {
    gulp.watch(appDev + '**/*.ts', ['build-ts']);
    gulp.watch(appDev + '**/*.html', ['build-html']);
    gulp.watch(appDev + '**/*.css', ['build-css']);
});

gulp.task('default', ['watch', 'build-ts', 'build-html', 'build-css']);