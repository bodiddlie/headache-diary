const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

gulp.task('sass', () => {
  return gulp.src('./src/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./src'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./src/scss/index.scss', ['sass']);
});