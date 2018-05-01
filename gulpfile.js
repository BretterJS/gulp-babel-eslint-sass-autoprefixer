// Gulp with Babel, Eslint and Sass with Autoprefixer

const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

// Linting
gulp.task('lint', function () {
    return gulp.src(['./src/js/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Copy files *html to Dist
gulp.task('copyFiles', () => {
  gulp.src('./src/html/*.html')
    .pipe(gulp.dest('./dist/html'));
});

// Convert ES6
gulp.task('es6', () =>
    gulp.src('./src/js/app.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./dist/js'))
);

// Convert Sass to CSS and Autoprefix
gulp.task('style', function () {
    return gulp.src('./src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.init())
      .pipe(autoprefixer())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/css'))
    //   .pipe(reload({stream: true}))
  });

  // Watch Sass 
 gulp.task('sass:watch', function () {
   gulp.watch('./src/css/*.scss', ['style']);
 }); 

 gulp.task('start', ['console', 'lint', 'style', 'sass:watch', 'es6', 'copyFiles']);
