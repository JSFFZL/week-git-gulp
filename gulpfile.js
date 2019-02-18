var gulp = require('gulp');

var webserver = require('gulp-webserver');
var scss = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');




gulp.task('webserver', function() {
    return gulp.src('./')
      .pipe(webserver({
        port:8083,
        livereload: true,
        open: true,
      }));
});

gulp.task('sass',function(){
    return gulp.src('./src/scss/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('./src/scss/'))
})

gulp.task('cssClean',function(){
    return gulp.src('./src/scss/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('js',function(){
    return gulp.src('./src/js/*.js')
    .pipe(concat('build.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
})

gulp.task('watch',function(){
    return gulp.watch('./src/scss/*.scss',gulp.series('sass'));
})


gulp.task('default',gulp.series('sass','js','webserver','watch'));

gulp.task('build',gulp.parallel('js','cssClean'));