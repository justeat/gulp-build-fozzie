const config = require('../config');

describe('environment config', () => {

    it('is production should be false', () => {
        expect(config.isProduction).toBe(false);
    });

    it('is dev should be true', () => {
        expect(config.isDev).toBe(true);
    });

    it('web root directory should be true', () => {
        expect(config.webRootDir).toBe('.');
    });

    it('web root directory can be updated', () => {
        // Arrange
        const webRootDir = './';

        // Act
        config.update({ webRootDir });

        // Assert
        expect(config.webRootDir).toBe(webRootDir);
    });

    it('asset src directory should be set', () => {
        expect(config.assetSrcDir).toBe('src');
    });

    it('asset src directory can be updated', () => {
        // Arrange
        const assetSrcDir = 'source';

        // Act
        config.update({ assetSrcDir });

        // Assert
        expect(config.assetSrcDir).toBe(assetSrcDir);
    });

    it('asset dist directory should be set', () => {
        expect(config.assetDistDir).toBe('dist');
    });

    it('asset dist directory can be updated', () => {
        // Arrange
        const assetDistDir = 'distribution';

        // Act
        config.update({ assetDistDir });

        // Assert
        expect(config.assetDistDir).toBe(assetDistDir);
    });

});

describe('css config', () => {

    it('scss directory should be set', () => {
        expect(config.css.scssDir).toBe('scss');
    });

    it('scss directory can be updated', () => {
        // Arrange
        const scssDir = 'sass';

        // Act
        config.update({ css: { scssDir } });

        // Assert
        expect(config.css.scssDir).toBe(scssDir);
    });

    it('css directory should be set', () => {
        expect(config.css.cssDir).toBe('css');
    });

    it('css directory can be updated', () => {
        // Arrange
        const cssDir = 'styles';

        // Act
        config.update({ css: { cssDir } });

        // Assert
        expect(config.css.cssDir).toBe(cssDir);
    });

    it('lint paths should be set', () => {
        expect(config.css.lintPaths).toEqual(['']);
    });

    it('lint paths can be updated', () => {
        // Arrange
        const lintPaths = ['./lint-me', '🦄'];

        // Act
        config.update({ css: { lintPaths } });

        // Assert
        expect(config.css.lintPaths).toBe(lintPaths);
    });

    it('sourcemaps should be true', () => {
        expect(config.css.sourcemaps).toBe(true);
    });

    it('sourcemaps can be updated', () => {
        // Arrange
        const sourcemaps = false;

        // Act
        config.update({ css: { sourcemaps } });

        // Assert
        expect(config.css.sourcemaps).toBe(sourcemaps);
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

    it('svg sprite filename should be set', () => {
        expect(config.img.svgSpriteFilename).toBe('sprite.svg');
    });
});

describe('service worker config', () => {

    it('is enabled should be false', () => {
        expect(config.sw.isEnabled).toBe(false);
    });

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

describe('config update', () => {

    it('passing empty config should not override', () => {
        // Arrange
        const newConfig = {};

        // Act
        config.update(newConfig);

        // Assert
        expect(config).not.toEqual({});
    });

});
