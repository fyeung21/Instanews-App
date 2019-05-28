const gulp = require("gulp"); // Load Gulp!
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');

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

gulp.task('reload', function(){
   browserSync.reload();
});

gulp.task("watch", function() {
  gulp.watch(["js/*.js", 'index.html'], gulp.series("scripts", "reload"));
});

gulp.task('default', gulp.parallel('watch', "browser-sync"));






// process JS files and return the stream.
// gulp.task('js', function () {
//   return gulp.src('js/*js')
//       .pipe(browserify())
//       .pipe(uglify())
//       .pipe(gulp.dest('dist/js'));
// });
