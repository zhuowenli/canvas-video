/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const glob = require('glob');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');
const babelify = require('babelify');
const browserify = require('browserify');
const gulp = require('gulp');
const sass = require('gulp-sass');
const ztpl = require('gulp-ztpl');
const {argv} = require('yargs');

const path = require('path');
const {exec} = require('child_process');
const _watch = argv.watch || 'public';

const options = {
    src: `./src/**/*.js`,
    js: `./js/`,
    sass: `./sass/**/*.scss`,
    css: `./css/`,
    html: `./ztpl/**/*.html`,
    ztpl: `./ztpl`,
}

// 编译模板
gulp.task('ztpl', function(){
    return gulp.src(options.html)
        .pipe(ztpl({
            base: (options.ztpl),
            combo: true,
            output: ('./src/tpl'),
            type: 'commonjs',
            escape: false,
        }));
});

// 编译JS
gulp.task('scripts', () => {
    return glob('./src/*.js', (err, files) => {
        if(err) done(err);

        const tasks = files.map(entry => {
            const b = watchify(browserify({
                entries: [entry]
            }));

            b.transform(babelify, {presets: ["es2015"]});

            return b.bundle()
                .on('error', function(e){
                    console.log('--------------------------------');
                    console.log('Filepath ' + e.filename);
                    console.log(e.loc);
                    console.log(e.codeFrame);
                    console.log('--------------------------------');
                    this.emit('end');
                })
                .pipe(source(path.basename(entry)))
                .pipe(buffer())
                .pipe(gulp.dest(options.js));
        });
    });
});

//编译sass
gulp.task('sass', function() {
    return gulp.src(options.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(options.css));
});

gulp.task('default', (cb) => {
    gulp.watch(options.src, ['scripts']);
    gulp.watch(options.sass, ['sass']);
    gulp.watch(options.html, ['ztpl']);
});