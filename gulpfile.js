'use strict';

var gulp = require('gulp');
var karma = require('karma');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');

gulp.task('karma', function (done) {
  karma.server.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('jshint', function () {
  return gulp.src('./!(*min*).js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build', ['jshint', 'karma'], function () {
  return gulp.src('./angular-namespacer.js')
    .pipe(uglify())
    .pipe(rename('angular-namespacer.min.js'))
    .pipe(gulp.dest('./'));
});
