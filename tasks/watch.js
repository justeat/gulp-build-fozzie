const gulp = require('gulp');
const config = require('../config');

/**
 * watch Task
 * -------------
 * Watches for changes to JavaScript and CSS file changes and runs the
 * relevant build tasks for each type.
 *
 */
gulp.task('watch', ['default'], () => {

    gulp.watch(`${config.js.srcDir}/**/*.js`, ['scripts'])
        .on('change', config.gulp.changeEvent);

    gulp.watch(`${config.css.srcDir}/**/*.scss`, ['css'])
        .on('change', config.gulp.changeEvent);

});
