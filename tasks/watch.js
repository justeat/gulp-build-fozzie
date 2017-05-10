const gulp = require('gulp');
const runSequence = require('run-sequence');
const config = require('../config');

/**
 * watch Task
 * -------------
 * Watches for changes to JavaScript, CSS, and image file changes, running
 * relevant build tasks on change for each type.
 *
 */
gulp.task('watch', callback => {

    runSequence(
        'default',
        ['watch:scripts', 'watch:scripts:test', 'watch:css', 'watch:images', 'watch:docs'],
        callback
    );

});


/**
 * watch:scripts Task
 * -------------
 * Runs the `scripts` task when a JavaScript file is changed.
 *
 */
gulp.task('watch:scripts', () => {

    gulp.watch(`${config.js.srcDir}/**/!(*.test).js`, ['scripts'])
        .on('change', config.gulp.changeEvent);

});


/**
 * watch:scripts:test Task
 * -------------
 * Runs the `scripts:lint` and `scripts:test` tasks when a JavaScript unit test file is changed.
 *
 */
gulp.task('watch:scripts:test', () => {

    gulp.watch(`${config.js.srcDir}/**/*.test.js`, ['scripts:lint', 'scripts:test'])
        .on('change', config.gulp.changeEvent);

});


/**
 * watch:css Task
 * -------------
 * Runs the `css` task when a CSS file is changed.
 *
 */
gulp.task('watch:css', () => {

    gulp.watch(`${config.css.srcDir}/**/*.scss`, ['css'])
        .on('change', config.gulp.changeEvent);

});


/**
 * watch:images Task
 * -------------
 * Runs the `images` task when an image file is changed.
 *
 */
gulp.task('watch:images', () => {

    gulp.watch(`${config.img.srcDir}/**/*.{png,jpg,jpeg,gif,svg}`, ['images'])
        .on('change', config.gulp.changeEvent);

});


/**
 * watch:docs Task
 * -------------
 * Runs the `assemble` task when any documentation files change.
 *
 */
gulp.task('watch:docs', () => {
    console.log(`${config.docs.srcDir}/**/*.{md,hbs}`);

    // be careful with the paths here – must be relative, using 'cwd' attribute
    // to specify root otherwise it won’t recompile when newly created files
    // are added to a directory while running the watch
    gulp.watch(`**/*.{md,hbs}`,
        { cwd: `./${config.docs.rootDir}` },
        ['assemble']
    );

});
