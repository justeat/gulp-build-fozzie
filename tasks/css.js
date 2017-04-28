
const gulp = require('gulp'),
    config = require('../config'),
    postcss = require('gulp-postcss'),
    scss = require('postcss-scss'),
    stylelint = require('stylelint'),
    reporter = require('postcss-reporter');


/**
 * css:lint Task
 * -------------
 * Uses our config rules set in .stylelintrc to validate syntax and structure of the CSS
 *
 */
gulp.task('css:lint', () => gulp.src([`${config.css.srcDir}/**/*.scss`])
    .pipe(
        postcss([
            stylelint(),
            reporter({
                clearMessages: true,
                throwError: true
            })
        ],
        { syntax: scss })
    ));
