/* eslint-disable global-require */
/**
  gulp-build-fozzie
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in `tasks`. Any files in that directory get
  automatically required below.

  To add a new task, simply add a new task file that directory.
  `tasks/default.js` specifies the default set of tasks to run
  when you run `gulp`.
 */

const requireDir = require('require-dir');
const gulp = require('gulp');
const config = require('./config');
const pathBuilder = require('./pathBuilder');

const build = (srcGulp, options) => {
    if (options) {
        // Update config & pathBuilder with custom values — these values will
        // persist across all further requires in other files.
        config.update(options);
        pathBuilder.update(config);
    }

    // In gulp 4, tasks need to be included in a specific order, unless declared as functions.
    // We require each of the files individually rather than the whole directory so we can decide on the order.
    require('./tasks/clean');
    require('./tasks/copy');
    require('./tasks/css');
    require('./tasks/images');
    require('./tasks/javascript');
    require('./tasks/logger-file');
    require('./tasks/service-worker');
    require('./tasks/default');
    require('./tasks/watch');

    // Assign existing gulp tasks so that they are not lost.
    gulp.tasks = srcGulp.tasks;

    // Require dev tasks if running in development.
    if (config.isDev) {
        requireDir('./tasks-dev', { recurse: false });
    }
};

module.exports = {
    build,
    config,
    pathBuilder
};
