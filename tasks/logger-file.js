const gulp = require('gulp');
const file = require('gulp-file');
const fs = require('fs');
const gulpif = require('gulp-if');
const config = require('../config');
const pathBuilder = require('../pathBuilder');

/**
 *  `logger-file-create` Task
 *  ---------------
 *
 */

gulp.task('logger:createFile', () => file(config.logger.file, '', { src: true })
    .pipe(gulpif(
        !fs.existsSync(`${pathBuilder.jsErrorLoggerDir}/${config.logger.file}`),
        gulp.dest(pathBuilder.jsErrorLoggerDir)
    )));
