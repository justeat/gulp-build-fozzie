const gulp = require('gulp');
const eslint = require('gulp-eslint');
const cache = require('gulp-cached');
const plumber = require('gulp-plumber');
const config = require('../config');


/**
 * `tasks:lint` Task
 * -------------
 * Uses config rules to test the build tasks for valid JS.
 *
 */
gulp.task('tasks:lint', () => gulp.src('tasks/**')
    .pipe(cache('tasks-lint'))
    .pipe(plumber(config.gulp.onError)) // stops watch from breaking if an error occurs
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);
