const gulp = require('gulp');
const config = require('../config');
const workboxBuild = require('workbox-build');


/**
 *  `sw` Task
 *  ---------------
 * Generates a service worker to pre-cache the assets defined in the config.
 *
 */
gulp.task('sw', () =>
    workboxBuild.injectManifest(
        config.sw.workboxConfig
    ).catch(err => {
        console.log('Uh oh 😬', err);
    }));
