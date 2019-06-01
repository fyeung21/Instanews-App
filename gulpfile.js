const gulp = require("gulp"); // Load Gulp!
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const prettyError = require('gulp-prettyerror');
const uglifycss = require('gulp-uglifycss');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// Now that we've installed the terser package we can require it:
const terser = require("gulp-terser"),
  rename = require("gulp-rename");

  
gulp.task("scripts", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(terser({
      keep_fnames: false,
      toplevel: true
    }
    )) // Call the terser function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
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




// process JS files and return the stream.
// gulp.task('js', function () {
//   return gulp.src('js/*js')
//       .pipe(browserify())
//       .pipe(uglify())
//       .pipe(gulp.dest('dist/js'));
// });
