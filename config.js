const gutil = require('gulp-util');
const path = require('path');

const ConfigOptions = () => {

    const projectName = 'Gulp Build Fozzie';
    const isProduction = !!gutil.env.prod;
    const isDev = !isProduction;
    const envLog = isProduction ? 'Production' : 'Development';

    gutil.log(gutil.colors.yellow(`❯❯❯❯ Running ${projectName} task in ${gutil.colors.bold(`${envLog}`)}`));

    let config = {
        isProduction,

        isDev,

        assetSrcDir: 'src',
        assetDistDir: 'dist',

        /**
         * CSS-related variables
         */
        css: {
            scssDir: 'scss',
            cssDir: 'css',
            lintPaths: [''],
            sourcemaps: isDev
        },

        /**
         * Javascript-related variables
         */
        js: {
            srcFile: 'index.js',
            jsDir: 'js',
            distFile: 'script.js',
            applyRevision: true
        },

        /**
         * Image-related variables
         */
        img: {
            imgDir: 'img'
        },

        /**
         * Service Worker related variables
         */
         sw: {
             cacheId: '',
             importScripts: [],
             staticFileGlobs: [],
             swDir: 'sw',
             outputPath: 'service-worker.js'
         },

        /**
         * Documentation-related variables
         */
        docs: {
            rootDir: 'docs',
            templDir: 'templates',
            dataDir: 'data',
            outputAssets: false
        },

        /**
         * Banners and info
         */
        misc: {

            /**
             * Output file-size and gzip file-size. May slow-down build.
             */
            showFileSize: true,

            /**
             * Output files
             */
            showFiles: true
        },

        gulp: {

            /**
             * Reports which file was changed
             */
            changeEvent (evt) {
                gutil.log();
                gutil.log(gutil.colors.cyan.bold(`â¯â¯ File: ${path.basename(evt.path)}`), 'was', gutil.colors.magenta(evt.type));
            },

            /**
             * Formats Error messages a little better than we do usually
             *
             * Can use any of the following from err object (is this on MacOS only? Almost none of these are available on Windows):
             * status,file,line,column,message,formatted,messageFormatted,messageOriginal,relativePath,name,stack,showStack,showProperties,plugin
             */
            onError (err) {
                const { line, column, relativePath, plugin, message, status } = err;

                gutil.beep();
                gutil.log(gutil.colors.red.bold('-----------------------------------------------------------------------'));
                gutil.log(gutil.colors.red.bold(`Error in plugin: ${gutil.colors.cyan.bold(`'${plugin}'`)}`));

                if (line && column && relativePath) {
                    gutil.log(gutil.colors.red.bold(`on ${gutil.colors.cyan.bold(`line ${line}, column ${column}`)} of ${gutil.colors.cyan.bold(`'${relativePath}'`)}`));
                }

                gutil.log(gutil.colors.red.bold(message));
                gutil.log(gutil.colors.red.bold('-----------------------------------------------------------------------'));

                if (gutil.env.prod && err.status === 1) {
                    process.exit(1);
                }

                this.emit('end');
            }
        },

        update (options = {}) {
            config = Object.assign(config, options, {
                css: Object.assign(config.css, options.css),
                js: Object.assign(config.js, options.js),
                img: Object.assign(config.img, options.img),
                docs: Object.assign(config.docs, options.docs),
                misc: Object.assign(config.misc, options.misc),
                gulp: Object.assign(config.gulp, options.gulp)
            });
        }
    };

    return config;
};

module.exports = ConfigOptions();
