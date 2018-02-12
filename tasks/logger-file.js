const gulp = require('gulp');
const pathBuilder = require('../pathBuilder');
const config = require('../config');
const fs = require('fs');

/**
 *  `logger-file-create` Task
 *  ---------------
 *
 */

gulp.task('logger-file-create', () => {
    const fullFilePath = `${pathBuilder.jsErrorLoggerSubDir}/${config.logger.file}`;
    if (!fs.existsSync(fullFilePath)) {
        fs.mkdirSync(`${pathBuilder.jsErrorLoggerDir}`);
        fs.mkdirSync(`${pathBuilder.jsErrorLoggerSubDir}`);
        fs.writeFileSync(fullFilePath, '//empty file');
    }
});
