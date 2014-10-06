(function(){
    'use strict';

    /* global require: false */
    var gulp = require('gulp'),
        gutil = require('gulp-util'),
        clean = require('gulp-clean'),
        notify = require('gulp-notify'),
        es = require('event-stream'),
        runSeq = require('run-sequence'),
    //plumber = require('gulp-plumber'),
        changed = require('gulp-changed'),
        traceur = require('gulp-traceur'),
        connect = require('gulp-connect'),
        webserver = require('gulp-webserver'),
        symlink = require('gulp-symlink'),
        less = require('gulp-less');


    var appDir =        '',
        distDir =       appDir + 'dist/',
        srcDir =        appDir + 'src/',
        testDir =       appDir + 'test/',
        JSFiles =       srcDir + 'js/**/*.js',
        JSTestFiles =   testDir + 'unit/**/*.js',
        lessFiles =     srcDir + 'less/**/*.less',
        HTMLFiles =     srcDir + '**/*.html',
        assetFiles =    appDir + 'assets',
        bowerDeps =     appDir + 'bower_components';

    gulp.task('clean-dist', function () {
        return gulp.src(distDir + '*', {read: false}).pipe(clean());
    });

    gulp.task('dev-js', function () {
        return gulp.src(JSFiles)
            .pipe(changed(distDir + 'js/'))
            .pipe(traceur({
                //experimental: true,
                //sourceMap: false,
                modules: 'amd'
            })
                .on('error', gutil.log)
                .on("error", notify.onError(function (error) {
                    return "Traceur Error: " + error.message;
                }))
        ).pipe(gulp.dest(distDir + 'js/'))
            .pipe(connect.reload());
    });

    /**
     * HTML fájlok újratöltése
     */
    gulp.task('dev-html', function () {
        return  gulp.src(HTMLFiles)
            .pipe(changed(distDir))
            .pipe(gulp.dest(distDir));
    });


    gulp.task('dev-assets', function(){
        return es.concat(
            gulp.src(assetFiles).pipe(symlink(distDir)),
            gulp.src(bowerDeps).pipe(symlink(distDir))
        );
    });


    /**
     * Less fordítás
     */
    gulp.task('dev-less', function () {
        return gulp.src([srcDir + 'less/main.less'])
            .pipe(changed(distDir + 'css/'))
            .pipe(less()
                .on('error', gutil.log)
                .on("error", notify.onError(function (error) {
                    return "Less Error: " + error.message;
                }))
        )
            .pipe(gulp.dest(distDir + 'css/'))
            .pipe(connect.reload());
    });

    gulp.task('connect', function() {
        connect.server({
            root: distDir,
            livereload: true
        });
    });

    gulp.task('webserver', function() {
        gulp.src(['./dist/'])
            .pipe(webserver({
                livereload: true,
                directoryListing: true,
                open: true
            }));
    });


    gulp.task('dev', ['clean-dist'], function () {
        runSeq('dev-assets', 'dev-less', 'dev-js', 'dev-html', 'connect', function(){
            gulp.watch(JSFiles, ['dev-js']);
            gulp.watch(HTMLFiles, ['dev-html']);
            gulp.watch(lessFiles, ['dev-less']);
        });
    });
})();
