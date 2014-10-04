var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
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

gulp.task('templates', function() {
  gulp.src('./client/templates/**/*.hbs')
    .pipe(handlebars({
      handlebars: require('ember-handlebars')
    }))
    .pipe(wrap('Ember.Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Ember.TEMPLATES',
      noRedeclare: true,
      processName: function(filePath) {
        return declare.processNameByPath(filePath.replace('./client/templates/', ''));
      }
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['stylesheets', 'bower', 'javascripts', 'templates']);

gulp.task('watch', function() {
  gulp.watch('./views/**/*', reload);
  gulp.watch('./client/stylesheets/*', ['stylesheets']);
  gulp.watch('./bower_components/**/*', ['bower', reload]);
  gulp.watch('./client/javascripts/*', ['javascripts', reload]);
  gulp.watch('./client/templates/**/*', ['templates', reload]);
});

gulp.task('browser-sync', function() {
  browserSync({
    proxy: 'localhost:5000'
  });
});

gulp.task('dev', ['default', 'watch', 'browser-sync']);
