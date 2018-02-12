const gulp = require('gulp');
const pathBuilder = require('../pathBuilder');
const config = require('../config');

/**
 *  `logger-file-create` Task
 *  ---------------
 *
 */

gulp.task('logger-file-create', () => {
    const fs = require('fs');
    const fullFilePath = `${pathBuilder.jsErrorLoggerSubDir}/${config.logger.file}`;
    if (!fs.existsSync(fullFilePath)) {
        fs.mkdirSync(`${pathBuilder.jsErrorLoggerDir}`);
        fs.mkdirSync(`${pathBuilder.jsErrorLoggerSubDir}`);
        fs.writeFileSync(fullFilePath, '//empty file');
        console.log('Error logging endpoint file added to the filesystem');
    } else {
        console.log('Error logging endpoint file already exists in the filesystem');
    }
});
