var gulp = require('gulp');
var generate = require('./index');

var file = "./sample.json";

gulp.task('default', function() {
    // gulp.src -- get html template
    return gulp.src(file)
        // pipe through plugin
        .pipe(generate())
        // set destination
        .pipe(gulp.dest("./build"))
});

