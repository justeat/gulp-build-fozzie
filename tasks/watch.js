const gulp = require('gulp');

const config = require('../config');
const pathBuilder = require('../pathBuilder');


/**
 * `watch:css` Task
 * -------------
 * Runs the `css` task when a CSS file is changed.
 *
 */
gulp.task('watch:css', () => {
    gulp
        .watch([
            `${pathBuilder.scssSrcDir}/**/*.scss`,
            'node_modules/@justeat/**/*.scss'
        ], gulp.series(['css']))
        .on('change', config.gulp.changeEvent);
});


/**
 * `watch:scripts` Task
 * -------------
 * Runs the `scripts` task when a JavaScript file is changed.
 *
 */
gulp.task('watch:scripts', () => gulp.watch(`${pathBuilder.jsSrcDir}/**/!(*.test).js`, gulp.series(['scripts']))
    .on('change', config.gulp.changeEvent));


/**
 * `watch:scripts:test` Task
 * -------------
 * Runs the `scripts:lint` and `scripts:test` tasks when a JavaScript unit
 * test file is changed.
 *
 */
gulp.task('watch:scripts:test', () => gulp.watch(`${pathBuilder.jsSrcDir}/**/*.test.js`, gulp.series(['scripts:lint', 'scripts:test']))
    .on('change', config.gulp.changeEvent));


/**
 * `watch:images` Task
 * -------------
 * Runs the `images` task when an image file is changed.
 *
 */
gulp.task('watch:images', () => gulp.watch(`${pathBuilder.imgSrcDir}/**/*.{png,jpg,jpeg,gif,svg}`, gulp.series(['images']))
    .on('change', config.gulp.changeEvent));


/**
 * `watch:docs` Task
 * -------------
 * Watches for changes to JavaScript, CSS, image, and documentation file
 * changes, running relevant build tasks on change for each type.
 *
 */
gulp.task('watch:docs', done => {
    config.docs.outputAssets = true;

    gulp.series(
        'default',
        gulp.parallel('watch:css', 'watch:scripts', 'watch:scripts:test', 'watch:images', 'watch:docs:templates'),
        done
    );
});


/**
 * `watch:docs:templates` Task
 * -------------
 * Runs the `assemble` task when any documentation files change.
 *
 */

// be careful with the paths here – must be relative, using 'cwd' attribute
// to specify root otherwise it won’t recompile when newly created files
// are added to a directory while running the watch
gulp.task('watch:docs:templates', () => gulp.watch(
    '**/*.{md,hbs}',
    { cwd: `./${config.docs.rootDir}` },
    gulp.series(['assemble'])
).on('change', (eventType, fileName) => {
    config.gulp.changeEvent({ type: eventType, path: fileName });
}));


/**
 * `watch` Task
 * -------------
 * Watches for changes to JavaScript, CSS, and image file changes, running
 * relevant build tasks on change for each type.
 *
 */
gulp.task('watch', gulp.series(
    'default',
    gulp.parallel('watch:css', 'watch:scripts', 'watch:scripts:test', 'watch:images'),
    done => {
        done();
    }
));
