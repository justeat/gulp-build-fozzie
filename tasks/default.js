const gulp = require('gulp');

const config = require('../config');


/**
 * `default` Task
 * ---------------
 * TODO: This task needs to be fully tested in any applications that use this task directly (i.e. app_consumerweb)
 * TODO: As this is legacy, this hasn't been done currently
 *
 */
gulp.task('default', callback => {
    gulp.series(
        gulp.parallel('copy:fonts', 'images'),
        gulp.series('css', 'scripts'),
        'logger:createFile',
        ...(config.sw.isEnabled ? 'service-worker' : ''),
        callback
    );
});
