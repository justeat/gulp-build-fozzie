const gulp = require('gulp');
const assemble = require('assemble');

const helpers = require('handlebars-helpers');
const { getCompiledTemplate, getTemplateNames } = require('@justeat/f-templates-loader');
const { i18n } = require('handlebars-helper-i18n');

const plumber = require('gulp-plumber');
// const newer = require('gulp-newer');
const extname = require('gulp-extname');

const config = require('../config');
const pathBuilder = require('../pathBuilder');

const app = assemble();

app.helper('is', helpers.comparison().is);
app.helper('i18n', i18n);
app.helper('markdown', require('helper-markdown'));
app.helper('md', require('helper-md'));


/**
 * Looping through directories in './templates' and registering a helper for each module found
 */
const registerSharedTemplates = () => {
    const templateNames = getTemplateNames(config.docs.excludeTemplateDirs);

    templateNames.forEach(templateName => {
        app.helper(`f-${templateName}`, () => getCompiledTemplate(templateName));
    });
};


// Loops through the helpers object and initialises handlebars helpers
Object.keys(config.docs.helpers).forEach(helper => {
    app.helper(helper, config.docs.helpers[helper]);
});


/**
 * `assemble` Task
 * -------------
 * Generates the documentation files.
 *
 */
gulp.task('assemble', () => {

    app.enable('debugEngine');
    app.layouts(`${pathBuilder.docsTemplateDir}/layouts/*.{md,hbs}`);
    app.partials(`${pathBuilder.docsTemplateDir}/includes/**/*.{md,hbs}`);
    app.data(`${pathBuilder.docsDataDir}/*.{json,yml}`);
    app.option('layout', 'default');

    app.data('./package.json', { namespace: true });
    app.data({
        baseUrl: config.isProduction ? config.docs.remoteBase : '',
        jsFilename: config.js.distFile
    });

    registerSharedTemplates();

    return app.src(`${pathBuilder.docsTemplateDir}/pages/**/*.{md,hbs}`)
        // stops watch from breaking on error
        .pipe(plumber(config.gulp.onError))

        // can’t get newer to work with page includes: such that a many > 1 relationship.  Commenting out so just recompiles all for now
        // .pipe(newer({
        //     dest: pathBuilder.docsDistDir,
        //     ext: '.html'
        // }))

        .pipe(app.renderFile())
        .pipe(extname())
        .pipe(app.dest(pathBuilder.docsDistDir));

});
