var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var browserify = require('gulp-browserify');
var watch = require('gulp-watch');

gulp.task('stylesheets', function () {
  gulp.src('./client/stylesheets/app.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./public'));
});

gulp.task('bower', function() {
  gulp.src(mainBowerFiles())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/'));
});

gulp.task('javascripts', function () {
  gulp.src('./client/javascripts/app.js')
    .pipe(browserify())
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['stylesheets', 'bower', 'javascripts']);

gulp.task('watch', function() {
  gulp.watch('./client/stylesheets/*', ['stylesheets']);
  gulp.watch('./bower_components/**/*', ['bower']);
  gulp.watch('./client/js/*', ['javascripts']);
});

gulp.task('dev', ['default', 'watch']);
