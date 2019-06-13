const gulp = require("gulp"); 
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const prettyError = require('gulp-prettyerror');
const uglifycss = require('gulp-uglifycss');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const terser = require("gulp-terser"),
  rename = require("gulp-rename");

  
gulp.task("scripts", function() {
  return gulp
    .src("./js/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(terser({
      keep_fnames: false,
      toplevel: true
    }
    ))
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("./build/js"));
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
});

gulp.task('reload', function(done){
   browserSync.reload();
   done();
});

gulp.task("watch", function() {
  gulp.watch('index.html', gulp.series("reload"));
  gulp.watch(["js/*.js"], gulp.series("scripts", "reload"));
  gulp.watch(["sass/*.scss"], gulp.series("sass", "reload"));
});

gulp.task('default', gulp.parallel("browser-sync", 'watch'));

gulp.task('sass', function(done) {
  return gulp
    .src('./sass/style.scss', { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions']
      })
    )
    .pipe(uglifycss())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./build/css'));
});



