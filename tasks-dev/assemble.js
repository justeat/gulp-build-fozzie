const gulp = require('gulp');
const assemble = require('assemble');
const helpers = require('handlebars-helpers');
const debug = require('gulp-debug');
const plumber = require('gulp-plumber');
const newer = require('gulp-newer');
const extname = require('gulp-extname');
const expand = require('expand');
const config = require('../config');


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

    app.enable('debugEngine');
    app.layouts(`${config.docs.srcDir}/${config.docs.templDir}/layouts/*.{md,hbs}`);
    app.partials(`${config.docs.srcDir}/${config.docs.templDir}/includes/**/*.{md,hbs}`);
    app.data(`${config.docs.srcDir}/${config.docs.dataDir}/*.{json,yml}`);
    app.option('layout', 'default');

    app.data('./package.json', { namespace: true });
    app.data({
        cssUrl: config.docs.cssUrl,
        jsUrl: config.docs.jsUrl
    });

    // pre-render any data <%= variable %> declarations in the yml front-end matter
    app.preRender(/\.(hbs|html)$/, (view, next) => {
      view.data = expand(view.data, app.cache.data);
      next();
    });

    return app.src(`${config.docs.srcDir}/${config.docs.templDir}/pages/**/*.{md,hbs}`)
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
