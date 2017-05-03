const config = require('../config');

describe('environment config', () => {

    it('is production should be false', () => {
        expect(config.isProduction).toBe(false);
    });

    it('is dev should be true', () => {
        expect(config.isDev).toBe(true);
    });

});

describe('css config', () => {

    it('src directory should be set', () => {
        expect(config.css.srcDir).toBe('src/scss');
    });

    it('dist directory should be set', () => {
        expect(config.css.distDir).toBe('dist/css');
    });

    it('autoprefixer options should be set', () => {
        expect(config.css.autoprefixer).toEqual(['> 5%', 'last 2 versions', 'ie > 7', 'Safari >= 8']);
    });

    it('sourcemaps should be true', () => {
        expect(config.css.sourcemaps).toBe(true);
    });

});

describe('javascript config', () => {

    it('src directory should be set', () => {
        expect(config.js.srcDir).toBe('src/js');
    });

    it('src file should be set', () => {
        expect(config.js.srcFile).toBe('index.js');
    });

    it('dist directory should be set', () => {
        expect(config.js.distDir).toBe('dist/js');
    });

    it('dist file should be set', () => {
        expect(config.js.distFile).toBe('script.js');
    });

    it('applyRevision should be true', () => {
        expect(config.js.applyRevision).toBe(true);
    });

});

describe('image config', () => {

    it('src directory should be set', () => {
        expect(config.img.srcDir).toBe('src/img');
    });

    it('dist directory should be set', () => {
        expect(config.img.distDir).toBe('dist/img');
    });
});

describe('miscellaneous config', () => {

    it('showFileSize should be true', () => {
        expect(config.misc.showFileSize).toBe(true);
    });

    it('showFiles should be true', () => {
        expect(config.misc.showFiles).toBe(true);
    });
});

describe('gulp config', () => {

    it('changeEvent should be a function', () => {
        expect(typeof config.gulp.changeEvent).toBe('function');
    });

    it('onError should be a function', () => {
        expect(typeof config.gulp.onError).toBe('function');
    });

});
