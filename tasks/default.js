const gulp = require('gulp');
const runSequence = require('run-sequence');

const config = require('../config');


/**
 * `default` Task
 * ---------------
 *
 */
gulp.task('default', callback => {
    runSequence(
        ['copy:fonts', 'images'],
        ['css', 'scripts'],
        ['logger:createFile'],
        ...(config.searchbox.isEnabled ? ['searchbox:copyFiles'] : []),
        ...(config.sw.isEnabled ? ['service-worker'] : []),
        callback
    );
});
