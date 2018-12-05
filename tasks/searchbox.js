const gulp = require('gulp');
const config = require('../config');
const rename = require('gulp-rename');
const version = config.searchbox.version ? config.searchbox.version : "";

/**
 *  `searchbox-file-copy` Task
 *  ---------------
 *
 */

gulp.task('searchbox:copyFiles', () => {
    return gulp.src('./node_modules/@justeat/f-searchbox/dist/*.js').pipe(rename({ suffix: `-${version}` })).pipe(gulp.dest(`${config.assetDistDir}/${config.searchbox.dir}`));
});
