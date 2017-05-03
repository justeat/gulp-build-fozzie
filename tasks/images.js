const changed = require('gulp-changed');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const config = require('../config');


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
gulp.task('images:optimise', () => gulp.src(`${config.img.srcDir}/**`)

    // ignore unchanged files
    .pipe(changed(config.img.distDir))

    // optimize
    .pipe(imagemin([
        imagemin.gifsicle({ optimizationLevel: 3 }),
        imagemin.jpegtran(),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo()
    ], { verbose: config.isDev }))

    // write the files to disk
    .pipe(gulp.dest(config.img.distDir))

);
