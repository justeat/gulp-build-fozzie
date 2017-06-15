const gulp          = require('gulp');
const changed       = require('gulp-changed');
const swPrecache    = require('sw-precache');
const filenames     = require('gulp-filenames');

const pathBuilder   = require('../pathBuilder');
const config        = require('../config');


/**
 * service-worker Task
 * -------------
 * Generates a service worker to pre-cache the assets defined in the config
 *
 */
gulp.task('service-worker', ['service-worker:copy', 'service-worker:locate'], () =>
    swPrecache.write(config.sw.outputFile, {
        // Used to avoid cache conflicts when serving on localhost.
        cacheId: config.sw.cacheId,
        importScripts: config.sw.importScripts.concat(filenames.get('service-worker-scripts')),
        staticFileGlobs: config.sw.staticFileGlobs
    })
);


/**
 * service-worker:copy Task
 * -------------
 * Copies the worker's internal scripts to the dist directory
 *
 */
gulp.task('service-worker:copy', () => gulp.src([`${pathBuilder.swSrcDir}/**/*`, ...config.sw.importScripts])
    .pipe(changed(pathBuilder.swDistDir)) // only let through changed files
    .pipe(gulp.dest(pathBuilder.swDistDir))
);


/**
 * service-worker:locate Task
 * -------------
 * Discovers scripts in the service worker directory
 *
 */
gulp.task('service-worker:locate', () => gulp.src(`${pathBuilder.swSrcDir}/**/*`)
    .pipe(filenames('service-worker-scripts'))
);
