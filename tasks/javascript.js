const gulp = require('gulp');
const cache = require('gulp-cached');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const size = require('gulp-size');
const exorcist = require('exorcist');
const eslint = require('gulp-eslint');

// jest packages
const { runCLI } = require('jest');
const { resolve } = require('path');

// bundle packages
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const { merge } = require('event-stream');
const { init, write } = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const rev = require('gulp-rev');
const stripDebug = require('gulp-strip-debug');

const config = require('../config');
const pathBuilder = require('../pathBuilder');


/**
 * `scripts:lint` Task
 * -------------
 * Uses config rules to test for valid JS.
 *
 */
gulp.task('scripts:lint', () => gulp.src([`${pathBuilder.jsSrcDir}/**/*.js`, ...config.js.lintPaths], { allowEmpty: config.js.allowEmpty })
    .pipe(cache('scripts-lint'))

    // stops watch from breaking on error
    .pipe(plumber(config.gulp.onError))

    .pipe(eslint({ fix: true }))
    .pipe(gulp.dest(file => file.base))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));


const jestTestRun = (args = {}) => runCLI(
    { bail: config.isProduction, passWithNoTests: true, ...args },
    [resolve(process.cwd())]
);

/**
 * `scripts:test` Task
 * -------------
 * Runs the JS unit tests.
 *
 */
gulp.task('scripts:test', async () => jestTestRun());


/**
 * `scripts:test:coverage` Task
 * -------------
 * Runs the JS unit tests and display a coverage report once complete.
 *
 */
gulp.task('scripts:test:coverage', async () => jestTestRun({ coverage: true }));


/**
 * `scripts:bundle` Task
 * -------------
 * Bundle the JS modules together into a single file and and transpile es2015 features to es5.
 *
 */
gulp.task('scripts:bundle', async () => {
    const bundleTasks = Object.keys(config.js.files).map(fileId => {
        const { srcPath, distFile } = config.js.files[fileId];
        const file = `${pathBuilder.jsSrcDir}/${srcPath}`;

        return browserify(file, { debug: config.isDev })
            .transform(babelify)
            .bundle()
            .on('error', config.gulp.onError)

            .pipe(gulpif(
                config.isDev,
                exorcist(`${pathBuilder.jsDistDir}/${distFile}.map`)
            ))
            .pipe(source(file))

            // convert to buffer object as sourcemaps don’t work with streams
            .pipe(buffer())

            .pipe(plumber({
                errorHandler: config.gulp.onError
            }))

            .pipe(rename(distFile))

            // If the package version name is set to `true`, version the js file name with the package number.
            .pipe(gulpif(
                config.js.usePackageVersion,
                rename({ suffix: `-${config.packageVersion}` })
            ))

            // output the unminified JS files
            .pipe(gulp.dest(pathBuilder.jsDistDir))

            // output the unminified JS files to docs assets folder
            .pipe(gulpif(
                config.docs.outputAssets,
                gulp.dest(pathBuilder.docsJsDistDir)
            ))

            // output the size of the unminified JS
            .pipe(gulpif(
                config.misc.showFileSize,
                size({
                    title: 'Bundled JS Report – unminified build –',
                    showFiles: config.misc.showFiles
                })
            ))

            // capture sourcemaps from transforms
            .pipe(gulpif(
                config.isDev,
                init({ loadMaps: true })
            ))

            // if production build, rip out our console logs
            .pipe(gulpif(
                config.isProduction && config.js.stripDebug,
                stripDebug()
            ))

            // minify the bundle
            .pipe(uglify({
                output: {
                    /* eslint-disable camelcase */
                    // keeps IE support for quoted object literals
                    quote_keys: true
                    /* eslint-enable camelcase */
                }
            }))

            // Apply filename suffix
            .pipe(rename({ suffix: '.min' }))

            // write the sourcemap to a separate file
            .pipe(gulpif(
                config.isDev,
                write('.')
            ))

            // output to docs assets folder
            .pipe(gulpif(
                config.docs.outputAssets,
                gulp.dest(pathBuilder.docsJsDistDir)
            ))

            // output minified file to destination JS folder
            .pipe(gulp.dest(pathBuilder.jsDistDir))

            // revision control for caching
            .pipe(gulpif(
                config.applyRevision,
                rev()
            ))

            // output the size of the minified JS
            .pipe(gulpif(
                config.misc.showFileSize,
                size({
                    title: 'Bundled JS Report – minified build –',
                    showFiles: config.misc.showFiles
                })
            ))

            .pipe(gulp.dest(pathBuilder.jsDistDir));
    });

    return merge(...bundleTasks);
});


/**
 *  `scripts` Task
 *  ---------------
 *  This needs to be at the end of this file, because no forward references in Gulp v4
 *
 */
gulp.task('scripts', gulp.series(
    'scripts:lint',
    'scripts:test',
    'clean:scripts',
    'scripts:bundle',
    'copy:js',
    done => {
        done();
    }
));
