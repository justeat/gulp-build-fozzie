const gulp = require('gulp');
const cache = require('gulp-cached');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const size = require('gulp-size');
const runSequence = require('run-sequence');
const exorcist = require('exorcist');
const eslint = require('gulp-eslint');

// jest packages
const jest = require('jest-cli');
const path = require('path');

// bundle packages
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const rev = require('gulp-rev');

const config = require('../config');
const pathBuilder = require('../pathBuilder');


/**
 *  `scripts` Task
 *  ---------------
 *
 */
gulp.task('scripts', callback => {
    runSequence(
        'scripts:lint',
        'scripts:test',
        'scripts:bundle',
        callback
    );
});


/**
 * `scripts:lint` Task
 * -------------
 * Uses config rules to test for valid JS.
 *
 */
gulp.task('scripts:lint', () => gulp.src([`${pathBuilder.jsSrcDir}/**/*.js`, ...config.js.lintPaths])
    .pipe(cache('scripts-lint'))

    // stops watch from breaking on error
    .pipe(plumber(config.gulp.onError))

    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);


/**
 * `scripts:test` Task
 * -------------
 * Runs the JS unit tests.
 *
 */
gulp.task('scripts:test', callback => {
    jest.runCLI(
        {},
        [path.resolve(process.cwd())],
        () => callback()
    );
});


/**
 * `scripts:bundle` Task
 * -------------
 * Bundle the JS modules together into a single file and and transpile es2015 features to es5.
 *
 */
gulp.task('scripts:bundle', ['clean:scripts'], () => browserify(`${pathBuilder.jsSrcDir}/${config.js.srcFile}`, { debug: config.isDev })
    .transform(babelify)
    .bundle()

    .pipe(plumber({
        errorHandler: config.gulp.onError
    }))

    // move the source map outisde of the JS file when not in prod
    .pipe(gulpif(config.isDev,
        exorcist(`${pathBuilder.jsDistDir}/${config.js.distFile}.map`)
    ))

    // create unminified file
    .pipe(source(config.js.distFile))
    .pipe(buffer())
    .pipe(gulp.dest(pathBuilder.jsDistDir))

    // output the size of the unminified JS
    .pipe(gulpif(config.misc.showFileSize,
        size({
            title: 'Bundled JS Report – unminified build –',
            showFiles: config.misc.showFiles
        })
    ))

    // capture sourcemaps from transforms
    .pipe(gulpif(config.isDev,
        sourcemaps.init({ loadMaps: true })
    ))

    // minify the bundle
    .pipe(uglify({
        output: {
            // keeps IE support for quoted object literals
            quote_keys: true
        }
    }))

    // output to docs assets folder
    .pipe(
        gulpif(config.docs.outputAssets,
            gulp.dest(pathBuilder.docsJsDistDir)
        )
    )

    // revision control for caching
    .pipe(gulpif(config.js.applyRevision,
        rev()
    ))

    // Apply filename suffix
    .pipe(rename({ suffix: '.min' }))

    // output the size of the minified JS
    .pipe(gulpif(config.misc.showFileSize,
        size({
            title: 'Bundled JS Report – minified build –',
            showFiles: config.misc.showFiles
        })
    ))

    // write the sourcemap to a separate file
    .pipe(gulpif(config.isDev,
        sourcemaps.write('.')
    ))

    .pipe(gulp.dest(pathBuilder.jsDistDir))
);
