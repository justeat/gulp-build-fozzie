const gulp = require('gulp');
const browserSync = require('browser-sync');

const config = require('../config');
const pathBuilder = require('../pathBuilder');


/**
 * `browser-sync` Task
 * -------------
 * Watches for changes to files and reloads a local website instance.
 *
 */
gulp.task('browser-sync', gulp.series('watch', () => {
    const options = {
        files: [
            `./${pathBuilder.cssDistDir}/**/*.css`,
            `./${pathBuilder.jsDistDir}/**/*.js`,
            ...config.browserSync.files
        ],
        proxy: config.browserSync.proxy,
        reloadDebounce: config.browserSync.reloadDebounce
    };

    browserSync.init(options);
}));


/**
 * `browser-sync:docs` Task
 * -------------
 * Generates the documentation files then opens the docs in a local server.
 *
 */
gulp.task('browser-sync:docs', gulp.series('assemble', () => {
    // TODO : SORT OUT PATHS AS NOT WORKING ON INTERNATIONAL CONSUMERWEB PROPERLY
    const options = {
        files: [
            `${pathBuilder.docsDistDir}/**/*.html`,
            `${pathBuilder.docsAssetsDistDir}**/*.css`,
            `${pathBuilder.docsAssetsDistDir}**/*.js`
        ],
        server: {
            baseDir: pathBuilder.docsDistDir,
            serveStaticOptions: {
                extensions: ['html']
            }
        },
        reloadDebounce: config.browserSync.reloadDebounce
    };

    browserSync.init(options);
}));
