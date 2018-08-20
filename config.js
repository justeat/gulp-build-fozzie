const gutil = require('gulp-util');
const path = require('path');
const union = require('lodash.union');
const packageConfig = require('./package.json');

const consumingPackageConfig = require(`${process.cwd()}/package.json`); // eslint-disable-line import/no-dynamic-require


const ConfigOptions = () => {
    const isProduction = !!gutil.env.prod;
    const isDev = !isProduction;
    const envLog = isProduction ? 'production' : 'development';
    const { lintModules } = gutil.env;
    const stripDebug = !gutil.env.noStripDebug;

    gutil.log(gutil.colors.yellow(`🐻  Running Gulp task for ${consumingPackageConfig.name}@${consumingPackageConfig.version} in ${gutil.colors.bold(envLog)} mode ${gutil.colors.gray(`(v${packageConfig.version})`)}`));

    let config = {
        isProduction,
        isDev,
        webRootDir: '.',
        assetSrcDir: 'src',
        assetDistDir: 'dist',
        applyRevision: true,
        packageVersion: consumingPackageConfig.version,

        /**
         * CSS-related variables
         */
        css: {
            scssDir: 'scss',
            cssDir: 'css',
            lintPaths: [...lintModules ? ['node_modules/@justeat/**/*.scss', '!node_modules/@justeat/**/node_modules/**/*.scss'] : []],
            sourcemaps: isDev,
            usePackageVersion: false
        },

        /**
         * Javascript-related variables
         */
        js: {
            files: {
                main: {
                    srcPath: 'index.js',
                    distFile: 'script.js'
                }
            },
            jsDir: 'js',
            lintPaths: [''],
            usePackageVersion: false,
            stripDebug
        },

        /**
         * f-logger-related variables
         */
        logger: {
            dir: 'js/shared',
            file: 'js-error.js'
        },

        /**
         * Image-related variables
         */
        img: {
            imgDir: 'img',
            svgSpriteFilename: 'sprite.svg'
        },

        /**
         * Imported assets related variables
         */
        importedAssets: {
            importedAssetsSrcGlob: 'node_modules/@justeat/*/',
            verbose: true
        },

        /**
         * Service Worker related variables
         */
        sw: {
            isEnabled: false,
            swDir: 'sw',
            outputFile: 'service-worker.js',
            staticFileGlobs: [],
            dynamicFileRegex: [],
            dynamicFileStrategy: 'cacheFirst',
            importScripts: [],
            cacheId: ''
        },

        /**
         * Copy takes an object of assets to copy from src to dist folders
         */
        copy: {
            js: {},
            css: {},
            img: {},
            fonts: {},
            docs: {}
        },

        /**
         * Documentation-related variables
         */
        docs: {
            rootDir: './docs',
            srcDir: 'src',
            distDir: 'dist',
            assetDir: 'assets/',
            templDir: 'templates',
            dataDir: 'data',
            outputAssets: false,
            remoteBase: '',
            helpers: {},
            excludeTemplateDirs: ['resources']
        },

        fonts: {
            fontsDir: 'fonts'
        },

        browserSync: {
            files: [],
            proxy: '',
            reloadDebounce: 1000
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
                gutil.log(gutil.colors.cyan.bold(`❯❯ File: ${path.basename(evt.path)}`), 'was', gutil.colors.magenta(evt.type));
            },

            /**
             * Formats Error messages a little better than we do usually
             *
             * Can use any of the following from err object (is this on MacOS only? Almost none of these are available on Windows):
             * status,file,line,column,message,formatted,messageFormatted,messageOriginal,relativePath,name,stack,showStack,showProperties,plugin
             */
            onError (err) {
                const {
                    line, column, relativePath, plugin, message
                } = err;

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

                if (this.emit) { this.emit('end'); }
            }
        },

        update (options = {}) {
            config = Object.assign(config, options, {
                css: Object.assign(config.css, options.css, {
                    lintPaths: union(config.css.lintPaths, (options.css ? options.css.lintPaths : []))
                }),
                js: Object.assign(config.js, options.js, {
                    files: Object.assign(config.js.files, (options.js ? options.js.files : {}), {
                        main: Object.assign(config.js.files.main, (options.js && options.js.files ? options.js.files.main : {}))
                    })
                }),
                logger: Object.assign(config.logger, options.logger),
                img: Object.assign(config.img, options.img),
                importedAssets: Object.assign(config.importedAssets, options.importedAssets),
                sw: Object.assign(config.sw, options.sw),
                copy: Object.assign(config.copy, options.copy),
                docs: Object.assign(config.docs, options.docs),
                fonts: Object.assign(config.fonts, options.fonts),
                browserSync: Object.assign(config.browserSync, options.browserSync),
                misc: Object.assign(config.misc, options.misc),
                gulp: Object.assign(config.gulp, options.gulp)
            });
        }
    };

    return config;
};

module.exports = ConfigOptions();
