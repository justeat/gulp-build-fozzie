const gulp = require('gulp');
const config = require('../config');

/**
 * watch Task
 * -------------
 * Watches for changes to JavaScript, CSS, and image file changes, running
 * relevant build tasks on change for each type.
 *
 */
gulp.task('watch', ['default', 'watch:scripts', 'watch:scripts:test', 'watch:css', 'watch:images']);


gulp.task('watch:scripts', () => {

    gulp.watch(`${config.js.srcDir}/**/!(*.test).js`, ['scripts'])
        .on('change', config.gulp.changeEvent);

});


gulp.task('watch:scripts:test', () => {

    gulp.watch(`${config.js.srcDir}/**/*.test.js`, ['scripts:lint', 'scripts:test'])
        .on('change', config.gulp.changeEvent);

});


gulp.task('watch:css', () => {

    gulp.watch(`${config.css.srcDir}/**/*.scss`, ['css'])
        .on('change', config.gulp.changeEvent);

});


gulp.task('watch:images', () => {

    gulp.watch(`${config.img.srcDir}/**/*.{png,jpg,jpeg,gif,svg}`, ['images'])
        .on('change', config.gulp.changeEvent);

});
