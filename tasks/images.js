const changed = require('gulp-changed');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

const config = require('../config');
const pathBuilder = require('../pathBuilder');


/**
 * images Task
 * -------------
 *
 *
 */
gulp.task('images', ['images:optimise']);


/**
 * images:optimise Task
 * -------------
 * Minifies PNG, JPEG, GIF and SVG images using imagemin
 *
 */
gulp.task('images:optimise', () => gulp.src(`${pathBuilder.imgSrcDir}/**`)

    // ignore unchanged files
    .pipe(changed(`${config.assetDistDir}/${config.img.imgDir}`))

    // optimize
    .pipe(imagemin([
        imagemin.gifsicle({ optimizationLevel: 3 }),
        imagemin.jpegtran(),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo()
    ], { verbose: config.isDev }))

    // write the files to disk
    .pipe(gulp.dest(`${config.assetDistDir}/${config.img.imgDir}`))

);
