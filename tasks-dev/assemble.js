const gulp = require('gulp');
const assemble = require('assemble');
const debug = require('gulp-debug');
const plumber = require('gulp-plumber');
const newer = require('gulp-newer');
const extname = require('gulp-extname');
const config = require('../config');


/**
 * `assemble` Task
 * -------------
 * Generates the documentation files.
 *
 */
gulp.task('assemble', () => {
    const app = assemble();

    app.helper('markdown', require('helper-markdown'));

    app.enable('debugEngine');
    app.layouts(`${config.docs.templDir}/layouts/*.{md,hbs}`);
    app.partials(`${config.docs.templDir}/includes/**/*.{md,hbs}`);
    app.option('layout', 'default');
    app.data({
        cssUrl: config.docs.cssUrl,
        jsUrl: config.docs.jsUrl
    });

    return app.src(`${config.docs.templDir}/pages/**/*.{md,hbs}`)
        .pipe(plumber(err => console.error(err.message))) // stops watch from breaking on error
        .pipe(newer({
            dest: config.docs.distDir,
            ext: '.html'
        }))
        .pipe(debug())
        .pipe(app.renderFile())
        .pipe(extname())
        .pipe(app.dest(config.docs.distDir));

});
