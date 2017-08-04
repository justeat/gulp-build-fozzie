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

        const assetSrc = pathBuilder[`${fileType}SrcDir`] + asset.path;
        const assetDist = pathBuilder[`${fileType}DistDir`] + asset.dest;
        const assetDocsDist = pathBuilder[`docs${fileTypeCapitalised}DistDir`] + asset.dest;

        if (asset.path !== undefined && asset.dest !== undefined) {

            gutil.log(`❯❯ Copying ${assetSrc} to ${assetDist}`);

            gulp.src(assetSrc)
                .pipe(plumber(config.gulp.onError))

                .pipe(gulpif(asset.revision,
                    rev()
                ))

                .pipe(gulp.dest(assetDist))

                // output to docs assets folder
                .pipe(gulpif(config.docs.outputAssets,
                    gulp.dest(assetDocsDist)
                ));
        } else {
            gutil.log(gutil.colors.red.bold('Error copying file - path not defined'));
        }
    });
};

// copy all the asset JS over to the docs folder
gulp.task('copy:js', () => {
    copy('js');
});

// copy all the asset JS over to the docs folder
gulp.task('copy:css', () => {
    copy('css');
});

// copy all the asset JS over to the docs folder
gulp.task('copy:img', () => {
    copy('img');
});


