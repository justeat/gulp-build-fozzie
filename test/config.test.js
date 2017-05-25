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

    it('scssDir should be set', () => {
        expect(config.css.scssDir).toBe('scss');
    });

    it('cssDir should be set', () => {
        expect(config.css.cssDir).toBe('css');
    });

    it('sourcemaps should be true', () => {
        expect(config.css.sourcemaps).toBe(true);
    });

});

describe('javascript config', () => {

    it('src file should be set', () => {
        expect(config.js.srcFile).toBe('index.js');
    });

    it('dist file should be set', () => {
        expect(config.js.distFile).toBe('script.js');
    });

    it('applyRevision should be true', () => {
        expect(config.js.applyRevision).toBe(true);
    });

});

describe('image config', () => {

    it('image directory should be set', () => {
        expect(config.img.imgDir).toBe('img');
    });
});

describe('service worker config', () => {

    it('service worker directory should be set', () => {
        expect(config.sw.swDir).toBe('sw');
    });

    it('output filename should be set', () => {
        expect(config.sw.outputFile).toBe('service-worker.js');
    });

    it('static file globs should be empty', () => {
        expect(config.sw.staticFileGlobs).toEqual(expect.arrayContaining([]));
    });

    it('scripts to import should be empty', () => {
        expect(config.sw.importScripts).toEqual(expect.arrayContaining([]));
    });

    it('cache id should be set', () => {
        expect(config.sw.cacheId).toBe('');
    });
});

describe('documentation config', () => {

    it('template directory should be set', () => {
        expect(config.docs.templDir).toBe('templates');
    });

    it('data directory should be set', () => {
        expect(config.docs.dataDir).toBe('data');
    });

    it('output assets should be false', () => {
        expect(config.docs.outputAssets).toBe(false);
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
