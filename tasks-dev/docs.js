const gulp = require('gulp');
const runSequence = require('run-sequence');

const config = require('../config');

/**
 * `docs` Task
 * -------------
 * Removes all files form the docs dist directory.
 *
 */
gulp.task('docs', callback => {

    config.docs.outputAssets = true;

    runSequence(
        'clean:docs',
        ['watch:docs', 'copy:fonts'],
        'browserSync:docs',
        callback
    );
});
