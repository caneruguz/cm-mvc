var gulp = require('gulp');
var rename = require("gulp-rename");
// require the plugin
var mithrilify = require('./lib/mithrilify')
var browserify = require('gulp-browserify');

var paths;

paths = {
    jsfiles: ['./comments/*.js', './header/*.js','./wiki/*.js', './logs/*.js', './pages/*.js'],
    htmlfile : './header/text.html'
};


gulp.task('mithrilify', function() {
    // gulp.src -- get html template
    return gulp.src("./header/text.html")
        // pipe through plugin
        .pipe(mithrilify("postRender"))
        //Rename file as view.js
        .pipe(rename('./header/view.js'))
        // set destination
        .pipe(gulp.dest('./'))
});

gulp.task('bfy', function() {
    // Single entry point to browserify
    gulp.src('./app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(rename('./bundle.js'))
        .pipe(gulp.dest('./'))
});

gulp.task('watch', function() {
    gulp.watch(paths.jsfiles, ['bfy']);
    gulp.watch(paths.htmlfile, ['mithrilify']);

});

gulp.task('default', ['mithrilify', 'bfy', 'watch']);