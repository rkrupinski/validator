var gulp = require('gulp')
  , browserify = require('gulp-browserify')
  , jshint = require('gulp-jshint');

gulp.task('lint', function () {
  gulp.src('./lib/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('bundle', function () {
  gulp.src('./lib/index.js')
    .pipe(browserify())
    .pipe(gulp.dest('./build'));
});

gulp.task('dev', function () {
  gulp.watch('./lib/**/*.js', [
    'lint',
    'bundle'
  ]);
});
