"use strict";

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var connect = require('connect');
var serveStatic = require('serve-static');

gulp.task('browserify', function() {
    var bundleStream = browserify('./src/index.js').bundle();
    bundleStream.pipe(source('game.js')).pipe(gulp.dest('./build'));
});

gulp.task('copy', function() {
    // copy phaser lib to build directory
    gulp.src(['./bower_components/phaser-official/build/phaser.min.js','./bower_components/phaser-official/build/phaser.map'])
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

gulp.task('build', ['browserify', 'copy']);

gulp.task('default', ['build', 'webserver']);
