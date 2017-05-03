const gulp = require('gulp');
const config = require('../config');


gulp.task('watch', ['default'], () => {

    gulp.watch(`${config.js.srcDir}/**/*.js`, ['scripts'])
        .on('change', config.gulp.changeEvent);

    gulp.watch(`${config.css.srcDir}/**/*.scss`, ['css'])
        .on('change', config.gulp.changeEvent);

});
