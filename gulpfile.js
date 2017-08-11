// Load required modules
var gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  cssnano = require('gulp-cssnano'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  clean = require('gulp-clean'),
  ghPages = require('gulp-gh-pages'),
  browserSync = require('browser-sync').create();

var options = {
  src: './private',
  dist: './public'
};

gulp.task('scss', function () {
  return gulp.src(options.src + '/sass/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({includePaths: ['scss']}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(options.dist +'/css'))
    .pipe(browserSync.stream());
});



gulp.task('scripts', function() {
  return gulp.src([
    './private/js/jquery.min.js',
    './private/js/highlight.pack.js',
    './private/js/skel.min.js',
    './private/js/util.js',
    './private/js/main.js',
    './private/js/markdownConverter.js',
    './private/js/loadMarkdown.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(options.dist +'/js'))
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['scripts'], function (done) {
  browserSync.reload();
  done();
});

// Delete the dist directory
gulp.task('clean', function() {
  return gulp.src(options.dist)
    .pipe(clean());
});

// Copy all other files to dist directly
gulp.task('copy', function() {
  // Copy html
  gulp.src('index.html', {cwd: options.src})
    .pipe(gulp.dest(options.dist));

  // Copy fonts
  gulp.src(options.src + '/fonts/**', {})
    .pipe(gulp.dest(options.dist + '/fonts'));

  // Copy images
  gulp.src(options.src + '/images/**', {})
    .pipe(gulp.dest(options.dist + '/images'));

});

/**
 * This task starts browsersync (https://browsersync.io/)
 * and watches/autoreloads the files.
 */
gulp.task('serve', ['build'], function() {

  browserSync.init(["css/*.css", "js/*.js"], {
    server: {
      baseDir: options.dist
    }
  });

  // watch for LESS files
  gulp.watch(options.src + "/sass/**/*.scss", ['scss']);
  // watch for HTML files
  gulp.watch(options.src + "**/**.html").on('change', function(){gulp.run('copy');browserSync.reload()});
  // watch for JS files
  gulp.watch(options.src + "/js/**/**/*.js", ['js-watch']);
});

gulp.task('deploy', function() {
    return gulp.src('./public/**/*')
        .pipe(ghPages());
});

gulp.task('default', ['serve']);
gulp.task('build', ['copy','scss','scripts']);
