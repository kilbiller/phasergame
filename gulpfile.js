"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var connect = require('connect');
var serveStatic = require('serve-static');
var uglify = require('gulp-uglify');

gulp.task('javascript', function() {
    var bundler = watchify(browserify('./src/index.js', watchify.args));

    bundler.on('update', rebundle);

    function rebundle() {
    return bundler.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('game.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('./build'));
    }

    return rebundle();
});

gulp.task('copy-assets', function() {
    // copy phaser lib to build directory
    gulp.src(['./node_modules/phaser/dist/phaser.min.js','./node_modules/phaser/dist/phaser.map'])
    .pipe(gulp.dest('./build'));

    // copy html, css and assets to build directory
    gulp.src(['./src/index.html', './src/assets/**', './src/css/**'], { base: './src' })
    .pipe(gulp.dest('./build'));
});

gulp.task('webserver', function() {
    var app = connect();
    app.use(serveStatic('build'));
    app.listen(3000);
});

gulp.task('build', ['copy-assets', 'javascript']);

gulp.task('default', ['build', 'webserver']);
