const gulp         = require('gulp');
const config       = require('../config');
const plumber      = require('gulp-plumber');
const gulpif       = require('gulp-if');
const rename       = require('gulp-rename');
const filesizegzip = require('filesizegzip');
const tap          = require('gulp-tap');

const sass         = require('gulp-sass');
const eyeglass     = require('eyeglass');
const cssnano      = require('cssnano');
const sourcemaps   = require('gulp-sourcemaps');
const postcss      = require('gulp-postcss');
const scss         = require('postcss-scss');
const assets       = require('postcss-assets');
const stylelint    = require('stylelint');
const reporter     = require('postcss-reporter');
const autoprefixer = require('autoprefixer');
const rev          = require('gulp-rev');

const scssSrcDir   = config.css.srcDir + config.css.scssDir;
const cssDistDir   = config.css.distDir + config.css.cssDir;
const cssDocsDistDir = config.docs.distDir + config.css.cssDir;

/**
 * css:lint Task
 * -------------
 * Uses our config rules set in .stylelintrc to validate syntax and structure of the CSS
 *
 */
gulp.task('css:lint', () => gulp.src([`${scssSrcDir}/**/*.scss`])
    .pipe(
        postcss([
            stylelint(),
            reporter({
                clearMessages: true,
                throwError: true
            })
        ],
        { syntax: scss })
    )
);


/**
 * css:prod Task
 * -------------
 * Ovewrites config vars to act like a production task
 * Then runs regular CSS Gulp Task
 *
 */
gulp.task('css:prod', () => {

    config.isProduction = true;
    config.isDev = false;
    gulp.start('css');

});


/**
 *  css Task
 *  ---------
 *
 */
gulp.task('css', ['css:lint'], () => gulp.src([`${scssSrcDir}/**/*.scss`])
    .pipe(plumber(config.gulp.onError))

    .pipe(gulpif(config.isDev, sourcemaps.init()))

    // compile using Sass & pulling int any Eyeglass modules (SCSS NPM modules)
    .pipe(
        sass(eyeglass())
    )

    .pipe(
        postcss([
            assets({ loadPaths: [ config.img.srcDir ] }), // Converts any specified assets to data URIs
            autoprefixer() // Autoprefixes CSS properties for various browsers – browsers specified in package.json config
        ])
    )

    .pipe(gulp.dest(cssDistDir)) // output our unminified files – not for use in prod but useful to be able to debug from

    .pipe(
        postcss([
            cssnano() // run CSSO – a CSS minifier
        ])
    )

    .pipe(rename({ suffix: ".min" })) //add .min suffix to CSS files

    // Output file-size
    .pipe(
        gulpif(config.misc.showFileSize,
            tap(file => {
                console.log(`❯❯ Minified CSS ${file.relative}`, filesizegzip(file.contents, true));
            })
        )
    )

    .pipe(gulpif(config.isDev, sourcemaps.write(undefined, { sourceRoot: null }))) // export sourcemaps (as a separate file)

    .pipe(gulp.dest(cssDocsDistDir))

    .pipe(rev()) // revision control for caching

    // output to destination CSS folder and the docs assets folder
    .pipe(gulp.dest(cssDistDir))
);
