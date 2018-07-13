const gulp = require('gulp');
const runSequence = require('run-sequence');
const ghPages = require('gulp-gh-pages');

const config = require('../config');
const pathBuilder = require('../pathBuilder');


/**
 * `docs` Task
 * -------------
 * Builds a fresh copy of any documentation found in the docs root directory
 * using Assemble, then watch for any file changes and reload the web page
 * when changes are detected in the docs dist directory.
 *
 */
gulp.task('docs', callback => {
    config.docs.outputAssets = true;

    runSequence(
        'clean:docs',
        'watch:docs',
        'browser-sync:docs',
        callback
    );
});


/**
 * `docs:deploy` Task
 * -------------
 * Build the documentation and then pushes the dist directory to the gh-pages branch.
 *
 */
gulp.task('docs:deploy', callback => {
    config.isProduction = true;
    config.docs.outputAssets = true;

    runSequence(
        'clean:docs',
        ['default', 'assemble', 'copy:docs'],
        'docs:release',
        callback
    );
});


/**
 * `docs:release` Task
 * -------------
 * Pushes the documentation dist directory to the gh-pages branch.
 *
 */
gulp.task('docs:release', () => gulp.src(`${pathBuilder.docsDistDir}/**/*`)
    .pipe(ghPages({
        message: `Minor : Documentation Update ${new Date().toISOString()}`
    })));
