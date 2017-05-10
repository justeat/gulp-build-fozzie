const gulp = require('gulp');
const browserSync = require('browser-sync');
const config = require('../config');


gulp.task('browserSync:docs', ['assemble'], () => {

    browserSync.init({
        files: [
            `${config.docs.distDir}/**/*.html`,
            `${config.docs.distDir}/assets/**/*.css`
        ],
        server: {
            baseDir: config.docs.distDir,
            serveStaticOptions: {
                extensions: ['html']
            }
        },
        reloadDebounce: 1000 // debounce our reloads by a second, to avoid multiple un-needed syncs
    });

});
