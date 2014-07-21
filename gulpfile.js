var gulp = require('gulp');
var concat = require("gulp-concat")
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var generate = require('jsontree-generator');

var paths = {
    cssfiles : ["./bower_components/bootstrap/dist/css/*.min.css", "./less/*.css"],
    jsfiles : [ "./bower_components/jquery/dist/*.min.js", "./bower_components/bootstrap/dist/js/*.min.js", "./node_modules/mithril/*.min.js", "./scripts/*.js"],
    json : "./sample.json",
    less : "./less/*.less"
}

gulp.task('generate', function() {
    // gulp.src -- get html template
    return gulp.src(paths.json)
        // pipe through plugin
        .pipe(generate())
        // set destination
        .pipe(gulp.dest("./dist"))
});

gulp.task("less", function(){
    gulp.src(paths.less)
        .pipe(less())
        .pipe(gulp.dest('./less'));

})

gulp.task('css', ["less"], function(){
    return gulp.src(paths.cssfiles)
        .pipe(concat('bundle.css'))
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('js', function(){
    return gulp.src(paths.jsfiles)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('watch', function() {
    gulp.watch(paths.less, ['css']);
    gulp.watch(paths.jsfiles, ['js']);

});


gulp.task("default", ["css", "js", "generate", "watch"]);