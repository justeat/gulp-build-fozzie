const gulp = require('gulp');
const del = require('del');
const config = require('../config');


/**
 * `clean:scripts` Task
 * -------------
 * Removes all files form the JavaScript dist directory
 *
 */
gulp.task('clean:scripts', () => del(`${config.js.distDir}/**/*`));


/**
 * `clean:docs` Task
 * -------------
 * Removes all files form the docs dist directory
 *
 */
gulp.task('clean:docs', () => del([
    `${config.docs.distDir}/**/*`,
    `!${config.docs.distDir}/assets/**`
]));
