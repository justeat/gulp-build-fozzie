const gulp = require('gulp');
const config = require('../config');

/**
 * watch Task
 * -------------
 * Watches for changes to JavaScript, CSS, and image file changes and
 * runs the relevant build tasks for each type.
 *
 */
gulp.task('watch', ['default'], () => {

    gulp.watch(`${config.js.srcDir}/**/!(*.test).js`, ['scripts'])
        .on('change', config.gulp.changeEvent);

    gulp.watch(`${config.js.srcDir}/**/*.test.js`, ['scripts:lint', 'scripts:test'])
        .on('change', config.gulp.changeEvent);

    gulp.watch(`${config.css.srcDir}/**/*.scss`, ['css'])
        .on('change', config.gulp.changeEvent);

    gulp.watch(`${config.img.srcDir}/**/*.{png,jpg,jpeg,gif,svg}`, ['images'])
        .on('change', config.gulp.changeEvent);

});
