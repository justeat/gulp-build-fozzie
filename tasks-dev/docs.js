const gulp = require('gulp');
const runSequence = require('run-sequence');
const ghPages = require('gulp-gh-pages');

const config = require('../config');
const pathBuilder = require('../pathBuilder');


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
        'browser-sync:docs',
        callback
    );
});


/**
 *  `docs:deploy` Task
 *  ------------
 *
 */
gulp.task('docs:deploy', callback => {

    config.isProduction = true;
    config.docs.outputAssets = true;

    runSequence(
        'clean:docs',
        ['default', 'assemble'],
        'docs:release',
        callback
    );

});


/**
 *  `docs:release` Task
 *  ------------
 *
 */
gulp.task('docs:release', () => gulp.src(`${pathBuilder.docsDistDir}/**/*`)
    .pipe(ghPages())
);
