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

const isEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object;

const build = (srcGulp, options = {}) => {

    if (!isEmpty(options)) {
        // Update config with custom values — these values will
        // persist across all further requires in other files.
        config.update(options);
    }

    // Assign existing gulp tasks so that they are not lost.
    gulp.tasks = srcGulp.tasks;

    // Require all tasks in /tasks, including subfolders
    requireDir('./tasks', { recurse: true });

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
