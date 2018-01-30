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
const es = require('event-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const rev = require('gulp-rev');
const stripDebug = require('gulp-strip-debug');

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
        'clean:scripts',
        'scripts:bundle',
        'copy:js',
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


const jestTestRun = (args = {}) => jest.runCLI(
    { ...{ bail: config.isProduction, passWithNoTests: true }, ...args },
    [path.resolve(process.cwd())]
);

/**
 * `scripts:test` Task
 * -------------
 * Runs the JS unit tests.
 *
 */
gulp.task('scripts:test', () => jestTestRun());


/**
 * `scripts:test:coverage` Task
 * -------------
 * Runs the JS unit tests and display a coverage report once complete.
 *
 */
gulp.task('scripts:test:coverage', () => jestTestRun({ coverage: true }));


/**
 * `scripts:bundle` Task
 * -------------
 * Bundle the JS modules together into a single file and and transpile es2015 features to es5.
 *
 */
gulp.task('scripts:bundle', () => {

    const bundleTasks = Object.keys(config.js.files).map(fileId => {

        const { srcPath, distFile } = config.js.files[fileId];
        const file = `${pathBuilder.jsSrcDir}/${srcPath}`;

        return browserify(file, { debug: config.isDev })
            .transform(babelify)
            .bundle()
            .on('error', config.gulp.onError)

            .pipe(gulpif(config.isDev,
                exorcist(`${pathBuilder.jsDistDir}/${distFile}.map`))
            )
            .pipe(source(file))

            // convert to buffer object as sourcemaps don’t work with streams
            .pipe(buffer())

            .pipe(plumber({
                errorHandler: config.gulp.onError
            }))

            .pipe(rename(distFile))

            // output the unminified JS files
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

            // if production build, rip out our console logs
            .pipe(gulpif(config.isProduction,
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
            .pipe(gulpif(config.isDev,
                sourcemaps.write('.')
            ))

            // output to docs assets folder
            .pipe(gulpif(config.docs.outputAssets,
                gulp.dest(pathBuilder.docsJsDistDir)
            ))

            // output minified file to destination JS folder
            .pipe(gulp.dest(pathBuilder.jsDistDir))

            // revision control for caching
            .pipe(gulpif(config.applyRevision,
                rev()
            ))

            // output the size of the minified JS
            .pipe(gulpif(config.misc.showFileSize,
                size({
                    title: 'Bundled JS Report – minified build –',
                    showFiles: config.misc.showFiles
                })
            ))

            .pipe(gulp.dest(pathBuilder.jsDistDir));

    });

    return es.merge(...bundleTasks);

});
