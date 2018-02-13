const gulp = require('gulp');
const pathBuilder = require('../pathBuilder');
const config = require('../config');
const file = require('gulp-file');
const fs = require('fs');
const gulpif = require('gulp-if');

/**
 *  `logger-file-create` Task
 *  ---------------
 *
 */

gulp.task('logger:createFile', () => file(config.logger.file, '', { src: true })
    .pipe(gulpif(!fs.existsSync(`${pathBuilder.jsErrorLoggerSubDir}/${config.logger.file}`),
        gulp.dest(pathBuilder.jsErrorLoggerSubDir)))
);
