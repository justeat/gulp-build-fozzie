const gulp = require('gulp');
const assemble = require('assemble');
const helpers = require('handlebars-helpers');
const debug = require('gulp-debug');
const plumber = require('gulp-plumber');
const newer = require('gulp-newer');
const extname = require('gulp-extname');
const expand = require('expand');

const config = require('../config');
const pathBuilder = require('../pathBuilder');


/**
 * `assemble` Task
 * -------------
 * Generates the documentation files.
 *
 */
gulp.task('assemble', () => {
    const app = assemble();

    app.helper('is', helpers.comparison().is);
    app.helper('markdown', require('helper-markdown'));
    app.helper('md', require('helper-md'));

    app.enable('debugEngine');
    app.layouts(`${pathBuilder.docsTemplatesDir}/layouts/*.{md,hbs}`);
    app.partials(`${pathBuilder.docsTemplatesDir}/includes/**/*.{md,hbs}`);
    app.data(`${pathBuilder.docsSrcDir}/${config.docs.dataDir}/*.{json,yml}`);
    app.option('layout', 'default');

    app.data('./package.json', { namespace: true });
    // app.data({});

    // pre-render any data <%= variable %> declarations in the yml front-end matter
    app.preRender(/\.(hbs|html)$/, (view, next) => {
        view.data = expand(view.data, app.cache.data);
        next();
    });

    return app.src(`${pathBuilder.docsTemplatesDir}/pages/**/*.{md,hbs}`)
        // stops watch from breaking on error
        .pipe(plumber(err => console.error(err.message)))
        .pipe(newer({
            dest: pathBuilder.docsDistDir,
            ext: '.html'
        }))
        .pipe(debug())
        .pipe(app.renderFile())
        .pipe(extname())
        .pipe(app.dest(pathBuilder.docsDistDir));

});
