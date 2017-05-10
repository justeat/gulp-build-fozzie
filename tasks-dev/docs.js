const gulp = require('gulp');
const runSequence = require('run-sequence');


/**
 * `docs` Task
 * -------------
 * Removes all files form the docs dist directory
 *
 */
gulp.task('docs', callback => {
    runSequence(
        'clean:docs',
        'watch',
        'browserSync:docs',
        callback
    );
});
