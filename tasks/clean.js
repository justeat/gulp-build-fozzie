const gulp = require('gulp');
const del = require('del');

const pathBuilder = require('../pathBuilder');


/**
 * `clean:css` Task
 * ---------------------
 * Removes all files from the CSS dist directory.
 *
 */
gulp.task('clean:css', () => del(`${pathBuilder.cssDistDir}/**/*`));


/**
 * `clean:scripts` Task
 * ---------------------
 * Removes all files from the JavaScript dist directory.
 *
 */
gulp.task('clean:scripts', () => del(`${pathBuilder.jsDistDir}/**/*`));


/**
 * `clean:images` Task
 * ---------------------
 * Removes all images from the images dist directory.
 *
 */
gulp.task('clean:images', () => del(`${pathBuilder.imgDistDir}/**/*`));


/**
 * `clean:docs` Task
 * -------------
 * Removes all files from the docs dist directory.
 *
 */
gulp.task('clean:docs', () => del([`${pathBuilder.docsDistDir}/**/*`]));
