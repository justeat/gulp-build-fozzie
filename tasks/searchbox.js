const gulp = require('gulp');
const config = require('../config');
const pathBuilder = require('../pathBuilder');
const rename = require('gulp-rename');
const version = config.searchboxVersion ? config.searchboxVersion : "";

/**
 *  `searchbox-file-copy` Task
 *  ---------------
 *
 */

gulp.task('searchbox:copyFiles', () => {
    return gulp.src('./node_modules/@justeat/f-searchbox/dist/*.js').pipe(rename({ suffix: `-${version}` })).pipe(gulp.dest(pathBuilder.searchboxDir));
});
