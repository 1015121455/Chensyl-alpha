var gulp = require('gulp');

// 引入gulp组件（插件）
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
// var watch = require('gulp-watch');
// var jshint = require('gulp-jshint');
// var minifyCss = require('gulp-minify-css');
// var notify = require('gulp-notify');
// var concat = require('gulp-concat');
// var useref = require('gulp-useref');
// var filter = require('gulp-filter');
// var gulpif = require('gulp-if');
// var clean = require('gulp-clean');


// 清空图片、样式、js
// gulp.task('clean', function () {
//     return gulp.src(['www/css/*', 'www/js/*', 'www/img/*', 'www/lib/*', 'www/templates/*'], {read: false})
//         .pipe(clean({force: true}));
// });

gulp.task('copy', function () {
    gulp.src('static/img/*')
        // 目标地址
        .pipe(gulp.dest('dist/img/'))

});

gulp.task('default', ['copy']);