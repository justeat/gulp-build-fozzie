const gutil = require('gulp-util');

const srcDir = 'src';
const distDir = 'dist';
const isProduction = !!gutil.env.prod;
const isDev = !isProduction;

const ConfigOptions = () => {

    const envLog = isProduction ? 'Production' : 'Development';
    console.log(gutil.colors.yellow(`❯❯❯❯ Running Gulp build in ${gutil.colors.bold(`${envLog}`)}`));

    let config = {

        isProduction,

        isDev,

        /**
         * CSS-related variables
         */
        css: {
            srcDir: `${srcDir}/scss`,
            distDir: `${distDir}/css`,

            // We are supporting the last 2 browsers, any browsers with >5% market share,
            // and ensuring we support IE8+ with prefixes
            autoprefixer: ['> 5%', 'last 2 versions', 'ie > 7', 'Safari >= 8'],
            sourcemaps: isDev
        },

        /**
         * Javascript-related variables
         */
        js: {
            srcDir: `${srcDir}/js`,
            srcFile: 'index.js',
            distDir: `${distDir}/js`,
            distFile: 'script.js',
            applyRevision: true
        },

        /**
         * Image-related variables
         */
        img: {
            srcDir: `${srcDir}/img`,
            distDir: `${distDir}/img`
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
            changeEvent: function (evt) {
                gutil.log();
                gutil.log(gutil.colors.cyan.bold(`â¯â¯ File: ${path.basename(evt.path)}`), 'was', gutil.colors.magenta(evt.type));
            },

            /**
             * Formats Error messages a little better than we do usually
             *
             * Can use any of the following from err object (is this on MacOS only? Almost none of these are available on Windows):
             * status,file,line,column,message,formatted,messageFormatted,messageOriginal,relativePath,name,stack,showStack,showProperties,plugin
             */
            onError: function (err) {
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

        update: (options = {}) => {
            config = Object.assign(config, options, {
                css: Object.assign(config.css, options.css),
                js: Object.assign(config.js, options.js),
                img: Object.assign(config.img, options.img),
                misc: Object.assign(config.misc, options.misc),
                gulp: Object.assign(config.gulp, options.gulp)
            });
        }
    };

    return config;
};

module.exports = ConfigOptions();
