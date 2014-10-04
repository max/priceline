var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('stylesheets', function () {
  gulp.src('./client/stylesheets/app.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./public'))
    .pipe(reload({stream:true}));
});

gulp.task('bower', function() {
  gulp.src(mainBowerFiles())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/'));
});

gulp.task('javascripts', function () {
  gulp.src('./client/javascripts/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['stylesheets', 'bower', 'javascripts']);

gulp.task('watch', function() {
  gulp.watch('./views/**/*', reload);
  gulp.watch('./client/stylesheets/*', ['stylesheets']);
  gulp.watch('./bower_components/**/*', ['bower', reload]);
  gulp.watch('./client/javascripts/*', ['javascripts', reload]);
});

gulp.task('browser-sync', function() {
  browserSync({
    proxy: 'localhost:5000'
  });
});

gulp.task('dev', ['default', 'watch', 'browser-sync']);
