const config = require('../config');

describe('environment config', () => {

    it('is production should be false', () => {
        expect(config.isProduction).toBe(false);
    });

    it('is dev should be true', () => {
        expect(config.isDev).toBe(true);
    });

    it('asset src directory should be set', () => {
        expect(config.assetSrcDir).toBe('src');
    });

    it('asset dist directory should be set', () => {
        expect(config.assetDistDir).toBe('dist');
    });

});

describe('css config', () => {

    it('scss directory should be set', () => {
        expect(config.css.scssDir).toBe('scss');
    });

    it('css directory should be set', () => {
        expect(config.css.cssDir).toBe('css');
    });

    it('lint paths should be set', () => {
        expect(config.css.lintPaths).toEqual(['']);
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

    it('lint paths should be set', () => {
        expect(config.js.lintPaths).toEqual(['']);
    });

    it('apply revision should be true', () => {
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

    it('static file globs should be set', () => {
        expect(config.sw.staticFileGlobs).toEqual([]);
    });

    it('dynamic file regex should be set', () => {
        expect(config.sw.dynamicFileRegex).toEqual([]);
    });

    it('dynamic file strategy should be set', () => {
        expect(config.sw.dynamicFileStrategy).toBe('cacheFirst');
    });

    it('import scripts should be set', () => {
        expect(config.sw.importScripts).toEqual([]);
    });

    it('cache id should be set', () => {
        expect(config.sw.cacheId).toBe('');
    });
});

describe('documentation config', () => {

    it('root directory should be set', () => {
        expect(config.docs.rootDir).toBe('./docs');
    });

    it('src directory should be set', () => {
        expect(config.docs.srcDir).toBe('src');
    });

    it('dist directory should be set', () => {
        expect(config.docs.distDir).toBe('dist');
    });

    it('asset directory should be set', () => {
        expect(config.docs.assetDir).toBe('assets/');
    });

    it('template directory should be set', () => {
        expect(config.docs.templDir).toBe('templates');
    });

    it('data directory should be set', () => {
        expect(config.docs.dataDir).toBe('data');
    });

    it('output assets should be false', () => {
        expect(config.docs.outputAssets).toBe(false);
    });

    it('remoteBase should be set', () => {
        expect(config.docs.remoteBase).toBe('');
    });
});

describe('miscellaneous config', () => {

    it('show file size should be true', () => {
        expect(config.misc.showFileSize).toBe(true);
    });

    it('show files should be true', () => {
        expect(config.misc.showFiles).toBe(true);
    });
});

describe('gulp config', () => {

    it('change event should be a function', () => {
        expect(typeof config.gulp.changeEvent).toBe('function');
    });

    it('on error should be a function', () => {
        expect(typeof config.gulp.onError).toBe('function');
    });

});
