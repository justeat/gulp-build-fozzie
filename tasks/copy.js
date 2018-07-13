const copyAssets = require('@justeat/f-copy-assets');
const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const rev = require('gulp-rev');

const config = require('../config');
const pathBuilder = require('../pathBuilder');


const copy = fileType => {
    Object.keys(config.copy[fileType]).forEach(assetId => {
        const asset = config.copy[fileType][assetId];
        const fileTypeCapitalised = fileType.charAt(0).toUpperCase() + fileType.slice(1);
        const dest = asset.dest || '';

        const assetSrc = pathBuilder[`${fileType}SrcDir`] + asset.path;
        const assetDist = pathBuilder[`${fileType}DistDir`] + dest;
        const assetDocsDist = pathBuilder[`docs${fileTypeCapitalised}DistDir`] + dest;

        if (asset.path !== undefined) {
            gutil.log(`❯❯ Copying ${assetSrc} to ${assetDist} ${config.docs.outputAssets ? `and ${assetDocsDist}` : ''}`);

            gulp.src(assetSrc)
                .pipe(plumber(config.gulp.onError))

                .pipe(gulpif(
                    asset.revision,
                    rev()
                ))

                .pipe(gulp.dest(assetDist))

                // output to docs assets folder
                .pipe(gulpif(
                    config.docs.outputAssets,
                    gulp.dest(assetDocsDist)
                ));
        } else {
            gutil.log(gutil.colors.red.bold('Error copying file - path not defined'));
        }
    });
};

/**
 * `copy:js` Task
 * ---------------------
 * Copy the specified JavaScript assets over to the dist folder.
 *
 */
gulp.task('copy:js', () => {
    copy('js');
});

/**
 * `copy:css` Task
 * ---------------------
 * Copy the specified CSS assets over to the dist folder.
 *
 */
gulp.task('copy:css', () => {
    copy('css');
});

/**
 * `copy:img` Task
 * ---------------------
 * Copy the specified image assets over to the dist folder.
 *
 */
gulp.task('copy:img', () => {
    copy('img');
});

/**
 * `copy:img:docs` Task
 * ---------------------
 * Copy all of the images in the assets dist folder over to the docs dist folder.
 *
 */
gulp.task('copy:img:docs', () => gulp.src(`${pathBuilder.imgDistDir}/**/*`)
    .pipe(plumber(config.gulp.onError))
    .pipe(gulp.dest(pathBuilder.docsImgDistDir)));

/**
 * `copy:fonts` Task
 * ---------------------
 * Copy the specified font assets over to the dist folder.
 *
 */
gulp.task('copy:fonts', () => {
    copy('fonts');
});

/**
 * `copy:docs` Task
 * ---------------------
 * Copy any specific files needed for the docs site (i.e. CNAME records)
 *
 */
gulp.task('copy:docs', () => {
    copy('docs');
});

/**
 * `copy:assets` Task
 * ---------------------
 * Copy assets from from packages to the dist folder.
 *
 */
gulp.task('copy:assets', () => copyAssets({
    pkgSrcGlob: config.importedAssets.importedAssetsSrcGlob,
    dest: config.assetDistDir,
    verbose: config.importedAssets.verbose,
    logger: gutil.log
})
    .catch(config.gulp.onError));
