var gulp = require('gulp');
var uglify = require('gulp-uglify');
var removeCode = require('gulp-remove-code');


gulp.task('build', function() {
    /*
     * Remove code for testing
     * Compress and minify src file.
     */

    gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});
