const gulp = require('gulp');
const browserSync = require('browser-sync');

const pathBuilder = require('../pathBuilder');

/**
 * `browserSync:docs` Task
 * -------------
 * Generates the documentation files then opens the docs in a local server.
 *
 */
gulp.task('browserSync:docs', ['assemble'], () => {

    browserSync.init({
        files: [
            `${pathBuilder.docsDistDir}/**/*.html`,
            `${pathBuilder.docsDistDir}/assets/**/*.css`,
            `${pathBuilder.docsDistDir}/assets/**/*.js`
        ],
        server: {
            baseDir: pathBuilder.docsDistDir,
            serveStaticOptions: {
                extensions: ['html']
            }
        },
        reloadDebounce: 1000 // debounce our reloads by a second, to avoid multiple un-needed syncs
    });

});
