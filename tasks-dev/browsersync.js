const gulp = require('gulp');
const browsersync = require('browser-sync');

const config = require('../config');
const pathBuilder = require('../pathBuilder');


/**
 * `browser-sync` Task
 * -------------
 * Watches for changes to files and reloads local .Net project.
 *
 */
gulp.task('browser-sync', config.browsersync.tasksBefore, () => {

    const options = {
        files: [
            `./${pathBuilder.cssDistDir}/**/*.css`,
            `./${pathBuilder.jsDistDir}/**/*.js`,
            ...config.browsersync.files
        ],
        proxy: config.browsersync.proxy,
        reloadDebounce: config.browsersync.reloadDebounce
    };

    browsersync.init(options);

});


/**
 * `browser-sync:docs` Task
 * -------------
 * Generates the documentation files then opens the docs in a local server.
 *
 */
gulp.task('browser-sync:docs', ['assemble'], () => {

    const options = {
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
        reloadDebounce: config.browsersync.reloadDebounce
    };

    browsersync.init(options);

});
