const gulp = require('gulp');
const runSequence = require('run-sequence');
const config = require('../config');


/**
 * `default` Task
 * ---------------
 *
 *
 */
gulp.task('default', callback => {
    if (config.sw.isEnabled) {
        runSequence(
            ['css', 'scripts', 'images'],
            'service-worker',
            callback
        );
    } else {
        runSequence(
            ['css', 'scripts', 'images'],
            callback
        );
    }
});
