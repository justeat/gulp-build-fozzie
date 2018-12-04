const gulp = require('gulp');
const file = require('gulp-file');
const fs = require('fs');
const gulpif = require('gulp-if');
const config = require('../config');
const pathBuilder = require('../pathBuilder');

/**
 *  `searchbox-file-copy` Task
 *  ---------------
 *
 */

gulp.task('searchbox:copyFiles', () => file(config.searchbox.file, '', { src: true })
    .pipe(gulpif(
        !fs.existsSync(`${pathBuilder.searchboxDir}/${config.searchbox.file}`),
        gulp.dest(pathBuilder.searchboxDir)
    )));
