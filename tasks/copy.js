const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const copyAssets = require('npm-assets');
const rev = require('gulp-rev');
const glob = require('glob');

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
 * `copy:fonts` Task
 * ---------------------
 * Copy the specified font assets over to the dist folder.
 *
 */
gulp.task('copy:fonts', () => {
    copy('fonts');
});

/**
 * `copy:assets` Task
 * ---------------------
 * Copy assets from from packages to the dist folder.
 *
 */
gulp.task('copy:assets', callback => {

    const ending = 'package.json';
    const getPkg = filepath => {
        const path = filepath.slice(0, -ending.length); // the parent directory that contains the package.json
        const split = path.split('/'); // e.g. [...'@justeat', '', 'fozzie', '']
        return {
            path,
            name: split[split.length - 2]
        };
    };

    glob(config.importedAssets.importedAssetsSrcGlob, (err, files) => {
        if (err) config.gulp.onError(err);

        const process = file => new Promise((resolve, reject) => {
            const pkg = getPkg(file);
            gutil.log(`❯❯ Copying any assets in ${pkg.path} to ${pathBuilder.importedAssetsDistDir}/${pkg.name}`);
            copyAssets(pkg.path, `${pathBuilder.importedAssetsDistDir}/${pkg.name}`, err => {
                if (err) {
                    config.gulp.onError(err);
                    reject();
                }
                else resolve();
            });
        });

        const promises = files
            .filter(file => file.endsWith(ending)) // Only consider folders containing a package.json
            .map(file => process(file));

        Promise.all(promises).then(callback);
    });

});
