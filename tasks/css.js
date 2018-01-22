const gulp = require('gulp');
const runSequence = require('run-sequence');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const filesizegzip = require('filesizegzip');
const tap = require('gulp-tap');
const clone = require('gulp-clone');
const merge = require('merge-stream');
const rev = require('gulp-rev');

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
const path = require('path');

const config = require('../config');
const pathBuilder = require('../pathBuilder');


/**
 *  `css` Task
 *  ---------------
 *
 */
gulp.task('css', callback => {
    runSequence(
        'scss:lint',
        'clean:css',
        'css:bundle',
        'copy:css',
        'css:lint',
        callback
    );
});


/**
 * `scss:lint` Task
 * -------------
 * Uses our config rules to validate syntax and structure of the SCSS.
 *
 */
gulp.task('scss:lint', () => gulp.src([`${pathBuilder.scssSrcDir}/**/*.scss`, ...config.css.lintPaths], { follow: config.isDev })
    // stops watch from breaking on error
    .pipe(gulpif(config.isDev,
        plumber(config.gulp.onError))
    )

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
 * `css:lint` Task
 * -------------
 * Uses our config rules to validate syntax and structure of the CSS.
 *
 */
gulp.task('css:lint', () => gulp.src(`${pathBuilder.cssDistDir}/**/*.css`)
    // stops watch from breaking on error
    .pipe(plumber(config.gulp.onError))

    .pipe(
        postcss([
            stylelint({
                config: {
                    rules: {
                        'property-no-unknown': true,
                        'selector-pseudo-element-no-unknown': true,
                        'selector-type-no-unknown': true,
                        'unit-no-unknown': true
                    }
                }
            }),
            reporter({
                clearMessages: true,
                throwError: true
            })
        ])
    )
);


/**
 *  `css:bundle` Task
 *  ---------
 *
 */
gulp.task('css:bundle', () => {

    const source = gulp.src(`${pathBuilder.scssSrcDir}/**/*.scss`)
        // stops watch from breaking on error
        .pipe(plumber(config.gulp.onError))

        .pipe(gulpif(config.isDev,
            sourcemaps.init()
        ))

        // compile using Sass & pulling int any Eyeglass modules (SCSS NPM modules)
        .pipe(
            sass(eyeglass())
        )

        .pipe(
            postcss([
                // Converts any specified assets to data URIs
                assets({
                    loadPaths: [
                        pathBuilder.imgSrcDir,
                        path.dirname(config.assetDistDir)
                    ]
                }),

                // Autoprefixes CSS properties for various browsers – browsers specified in package.json config
                autoprefixer()
            ])
        );

    const unminified = source.pipe(clone())
        // export sourcemaps (as a separate file)
        .pipe(gulpif(config.isDev,
            sourcemaps.write('.')
        ))

        // If the Fozzie package version name is set to `true`, version the css file name with the package number.
        .pipe(gulpif(config.fozzieSettings.useFozziePackageVersion,
            rename(cssBasePath => {
                cssBasePath.basename = config.fozzieSettings.fozzieBaseName + config.fozzieSettings.getFozziePackageVersion;
            })
        ))
        // output our unminified files – not for use in prod but useful to be able to debug from
        .pipe(gulp.dest(pathBuilder.cssDistDir))

        // Output file-size
        .pipe(gulpif(config.misc.showFileSize,
            tap(file => {
                gutil.log(`❯❯ CSS ${file.relative}`, filesizegzip(file.contents, true));
            })
        ));

    const minified = source.pipe(clone())
        .pipe(
            postcss([
                // run CSSO – a CSS minifier
                cssnano()
            ])
        )

        // If the Fozzie package version name is set to `true`, version the css file name with the package number.
        .pipe(gulpif(config.fozzieSettings.useFozziePackageVersion,
            rename(cssPath => {
                cssPath.basename = config.fozzieSettings.fozzieBaseName + config.fozzieSettings.getFozziePackageVersion;
            })
        ))

        // add .min suffix to CSS files
        .pipe(rename({ suffix: '.min' }))

        // export sourcemaps (as a separate file)
        .pipe(gulpif(config.isDev,
            sourcemaps.write('.')
        ))

        // output to docs assets folder
        .pipe(gulpif(config.docs.outputAssets,
            gulp.dest(pathBuilder.docsCssDistDir)
        ))

        // output minified file to destination CSS folder
        .pipe(gulp.dest(pathBuilder.cssDistDir))

        // revision control for caching
        .pipe(gulpif(config.applyRevision,
            rev()
        ))

        // Output file-size
        .pipe(gulpif(config.misc.showFileSize,
            tap(file => {
                gutil.log(`❯❯ Minified CSS ${file.relative}`, filesizegzip(file.contents, true));
            })
        ))

        // output to destination CSS folder
        .pipe(gulp.dest(pathBuilder.cssDistDir));

    return merge(unminified, minified);
});
