const gulp          = require('gulp');
const changed       = require('gulp-changed');
const swPrecache    = require('sw-precache');

const pathBuilder   = require('../pathBuilder');
const config        = require('../config');


/**
 * sw Task
 * -------------
 * Generates a service worker to pre-cache the assets defined in the config
 *
 */
gulp.task('service-worker', ['service-worker:copy'], () => 
    swPrecache.write(config.sw.outputPath, {
        // Used to avoid cache conflicts when serving on localhost.
        cacheId: config.sw.cacheId,
        importScripts: config.sw.importScripts,
        staticFileGlobs: config.sw.staticFileGlobs
    })
);

gulp.task('service-worker:copy', () => gulp.src(config.sw.importScripts.concat(pathBuilder.swSrcDir))
    .pipe(changed(pathBuilder.swDistDir)) // only let through changed files
    .pipe(gulp.dest(pathBuilder.swDistDir))
);