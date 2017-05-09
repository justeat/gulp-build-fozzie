const gulp = require('gulp');
const config = require('../config');
const postcss = require('gulp-postcss');
const scss = require('postcss-scss');
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');


/**
 *  css Task
 *  ---------
 *
 */
gulp.task('css', ['css:lint'], () => {});


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
    )
);
