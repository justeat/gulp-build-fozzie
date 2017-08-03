const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence');
const changed = require('gulp-changed');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');

const config = require('../config');
const pathBuilder = require('../pathBuilder');


/**
 * images Task
 * -------------
 *
 *
 */
gulp.task('images', callback => {
    runSequence(
        'clean:images',
        ['images:optimise', 'images:svg-sprite'],
        callback
    );
});


/**
 * images:optimise Task
 * -------------
 * Minifies PNG, JPEG, GIF and SVG images using imagemin.
 *
 */
gulp.task('images:optimise', () => gulp.src(`${pathBuilder.imgSrcDir}/**`)

    // ignore unchanged files
    .pipe(changed(`${pathBuilder.imgDistDir}`))

    // optimize
    .pipe(imagemin([
        imagemin.gifsicle({ optimizationLevel: 3 }),
        imagemin.jpegtran(),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo()
    ], { verbose: config.isDev }))

    .pipe(
        gulpif(config.docs.outputAssets,
            // write the files to the docs directory
            gulp.dest(pathBuilder.docsImgDistDir)
        )
    )

    // write the files to disk
    .pipe(gulp.dest(`${pathBuilder.imgDistDir}`))

);


/**
 * images:svg-sprite Task
 * -------------
 * Generate an SVG sprite using svgstore.
 *
 */
gulp.task('images:svg-sprite', () => gulp.src(`${pathBuilder.imgSrcDir}/**/*.svg`, {
        base: pathBuilder.imgSrcDir
    })
    .pipe(rename(file => {
        // Builds an ID containing the path and filename joined with dashes
        // e.g. icons/cards/amex becomes icons-cards-amex
        const name = file.dirname.split(path.sep);
        const exclude = name.indexOf('.');

        name.push(file.basename);

        if (exclude > -1) {
            name.splice(exclude, 1);
        }

        file.basename = name.join('-');
    }))

    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(rename(config.img.svgSpriteFilename))

    .pipe(gulpif(config.docs.outputAssets,
        // write the files to the docs directory
        gulp.dest(pathBuilder.docsImgDistDir)
    ))

    // write the files to disk
    .pipe(gulp.dest(`${pathBuilder.imgDistDir}`))
);
