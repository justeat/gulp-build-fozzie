const gulp = require('gulp');
const browserSync = require('browser-sync');

const config = require('../config');
const pathBuilder = require('../pathBuilder');

gulp.task('browserSync:docs', ['assemble'], () => {

    browserSync.init({
        files: [
            `${pathBuilder.docsDistDir}/**/*.html`,
            `${pathBuilder.docsDistDir}/assets/**/*.css`
        ],
        server: {
            baseDir: pathBuilder.docsDistDir,
            serveStaticOptions: {
                extensions: ['html']
            }
        },
        reloadDebounce: 1000 // debounce our reloads by a second, to avoid multiple un-needed syncs
    });

});
