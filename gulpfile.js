var gulp = require('gulp');
var uglify = require('gulp-uglify');
var stripCode = require('gulp-strip-code');
var removeCode = require('gulp-remove-code');


gulp.task('build', function() {
    /*
     * Remove code for testing
     * Compress and minify src file.
     */

    gulp.src('./src/*.js')
        .pipe(removeCode({ noDevFeatures: true, onlyForTesting: true}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});