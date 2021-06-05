var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var rigger = require('gulp-rigger');
var connect = require('gulp-connect');
var cssbeautify = require('gulp-cssbeautify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

//-----------------------------------path----------------------------//
var  path = {
  build: {
    html: 'build/',
    css: 'build/css',
    image: 'build/img',
    js: 'build/js'
  },
  src: {
    html: 'src/html/*.html',
    scss: 'src/scss/*.scss',
    image: 'src/img/*',
    js: 'src/js/*.js'
  },
  watch: {
    html: 'src/html/**',
    scss: 'src/scss/**',
    js: 'src/js/**'
  },
  clean: './build'
};
// server connect
gulp.task('connect', function() {
  connect.server({
    host: '127.0.0.1',
    port: 9999,
    root: 'build',
    livereload: true
  });
});

//-----------------------------------html task----------------------------//
gulp.task('html', function () {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(connect.reload())
    .pipe(gulp.dest(path.build.html))
});

//-----------------------------------SCSS to CSS----------------------------//
gulp.task('sass', function () {
  return gulp.src(path.src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false }))
    .pipe(cssbeautify())
    // .pipe(sourcemaps.init())
    // .pipe(cssmin())
    // .pipe(rename({suffix: '.min'}))
    .pipe(connect.reload())
    .pipe(gulp.dest(path.build.css));
});

gulp.task('scripts', function() {
  return gulp.src(path.src.js)
    //.pipe(concat('main.min.js'))
    // .pipe(uglify())
    .pipe(connect.reload())
    .pipe(gulp.dest('build/js'));
    // .pipe(gulp.dest(path.build.js));
});

//-----------------------------------watch task----------------------------//
gulp.task('sass:watch', function () {
  gulp.watch(path.watch.scss, ['sass']);
});
gulp.task('html:watch', function () {
  gulp.watch(path.watch.html, ['html']);
});
gulp.task('scripts:watch', function() {
  gulp.watch(path.src.js, ['scripts']);
});

//-----------------------------------default task----------------------------//
gulp.task('default', ['connect', 'html', 'sass', 'scripts', 'sass:watch', 'html:watch', 'scripts:watch']);
