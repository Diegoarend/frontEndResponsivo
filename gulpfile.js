const gulp = require('gulp');
const imagemin=require('gulp-imagemin');
const concat = require('gulp-concat');
const sourcemaps= require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer =require('autoprefixer')
const {src,series,parallel,dest,watch}= require('gulp')

const cssPath='./public/css/*.css';

function copyHtml(){
  return src('./*html').pipe(gulp.dest('dist'));
}

function imgTask(){
  return src('./public/img/*').pipe(imagemin()).pipe(gulp.dest('dist/public/images'));
}

function cssTask() {
  return src(cssPath)
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/public/css'))
  }

  function watchtask() {
    watch([cssPath],{interval:100},parallel(cssTask,copyHtml))
  }

exports.copyHtml=copyHtml;
exports.imgTask=imgTask;
exports.cssTask=cssTask
exports.default=series(parallel(copyHtml,imgTask,cssTask),watchtask);
/*var uglifycss = require('gulp-uglifycss');

npm install --save gulp-sourcemaps gulp-concat
gulp.task('default', gulp.series(function(done) {    
  gulp.src('./public/css/*.css')
    .pipe(uglifycss({
      "uglyComments": true
    }))
    .pipe(gulp.dest('./dist/'))
  done();
}));

gulp.task('run',['css']);

gulp.task('watch',  () => {
  gulp.watch('./public/css/*.css',['css'])
});

gulp.task('default',['run','watch']);
*/