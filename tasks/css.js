const gulp = require('gulp');
const runSequence = require('run-sequence');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const filesizegzip = require('filesizegzip');
const tap = require('gulp-tap');

const sass = require('gulp-sass');
const eyeglass = require('eyeglass');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const scss = require('postcss-scss');
const assets = require('postcss-assets');
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');
const autoprefixer = require('autoprefixer');
const rev = require('gulp-rev');

const config = require('../config');
const pathBuilder = require('../pathBuilder');


/**
 *  `css` Task
 *  ---------------
 *
 */
gulp.task('css', callback => {
    runSequence(
        'css:lint',
        'css:bundle',
        callback
    );
});


/**
 * css:lint Task
 * -------------
 * Uses our config rules set in .stylelintrc to validate syntax and structure of the CSS
 *
 */
gulp.task('css:lint', () => gulp.src(`${pathBuilder.scssSrcDir}/**/*.scss`)
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
 *  css Task
 *  ---------
 *
 */
gulp.task('css:bundle', ['clean:css'], () => gulp.src(`${pathBuilder.scssSrcDir}/**/*.scss`)
    .pipe(plumber(config.gulp.onError))

    .pipe(gulpif(config.isDev, sourcemaps.init()))

    // compile using Sass & pulling int any Eyeglass modules (SCSS NPM modules)
    .pipe(
        sass(eyeglass())
    )

    .pipe(
        postcss([
            // Converts any specified assets to data URIs
            assets({ loadPaths: [ pathBuilder.imgSrcDir ] }),

            // Autoprefixes CSS properties for various browsers – browsers specified in package.json config
            autoprefixer()
        ])
    )

    // Output file-size
    .pipe(
        gulpif(config.misc.showFileSize,
            tap(file => {
                gutil.log(`❯❯ CSS ${file.relative}`, filesizegzip(file.contents, true));
            })
        )
    )

    // output our unminified files – not for use in prod but useful to be able to debug from
    .pipe(gulp.dest(pathBuilder.cssDistDir))

    .pipe(
        postcss([
            // run CSSO – a CSS minifier
            cssnano()
        ])
    )

    // output to docs assets folder
    .pipe(
        gulpif(config.docs.outputAssets,
            gulp.dest(pathBuilder.docsCssDistDir)
        )
    )

    //add .min suffix to CSS files
    .pipe(rename({ suffix: ".min" }))

    // Output file-size
    .pipe(
        gulpif(config.misc.showFileSize,
            tap(file => {
                gutil.log(`❯❯ Minified CSS ${file.relative}`, filesizegzip(file.contents, true));
            })
        )
    )

    // export sourcemaps (as a separate file)
    .pipe(gulpif(config.isDev, sourcemaps.write(undefined, { sourceRoot: null })))

    // revision control for caching
    .pipe(rev())

    // output to destination CSS folder
    .pipe(gulp.dest(pathBuilder.cssDistDir))
);
