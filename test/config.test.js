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
        expect(config.css.lintPaths).toEqual(lintPaths);
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

    it('src path for bundle should be set', () => {
        expect(config.js.files.main.srcPath).toBe('index.js');
    });

    it('src path can be updated', () => {
        // Arrange
        const srcPath = 'app.js';

        // Act
        config.update({ js: { files: { main: { srcPath } } } });

        // Assert
        expect(config.js.files.main.srcPath).toBe(srcPath);
    });

    it('javascript directory should be set', () => {
        expect(config.js.jsDir).toBe('js');
    });

    it('javascript directory can be updated', () => {
        // Arrange
        const jsDir = 'scripts';

        // Act
        config.update({ js: { jsDir } });

        // Assert
        expect(config.js.jsDir).toBe(jsDir);
    });

    it('lint paths should be set', () => {
        expect(config.js.lintPaths).toEqual(['']);
    });

    it('lint paths can be updated', () => {
        // Arrange
        const lintPaths = ['./lint-me', '🐝'];

        // Act
        config.update({ js: { lintPaths } });

        // Assert
        expect(config.js.lintPaths).toEqual(lintPaths);
    });

    it('dist file should be set', () => {
        expect(config.js.files.main.distFile).toBe('script.js');
    });

    it('dist file can be updated', () => {
        // Arrange
        const distFile = 'app.js';

        // Act
        config.update({ js: { files: { main: { distFile } } } });

        // Assert
        expect(config.js.files.main.distFile).toBe(distFile);
    });

    it('apply revision should be true', () => {
        expect(config.js.files.main.applyRevision).toBe(true);
    });

    it('apply revision can be updated', () => {
        // Arrange
        const applyRevision = false;

        // Act
        config.update({ js: { files: { main: { applyRevision } } } });

        // Assert
        expect(config.js.files.main.applyRevision).toBe(applyRevision);
    });

});

describe('image config', () => {

    it('image directory should be set', () => {
        expect(config.img.imgDir).toBe('img');
    });

    it('image directory can be updated', () => {
        // Arrange
        const imgDir = 'images';

        // Act
        config.update({ img: { imgDir } });

        // Assert
        expect(config.img.imgDir).toBe(imgDir);
    });

    it('svg sprite filename should be set', () => {
        expect(config.img.svgSpriteFilename).toBe('sprite.svg');
    });

    it('svg sprite filename can be updated', () => {
        // Arrange
        const svgSpriteFilename = 'fairy.svg';

        // Act
        config.update({ img: { svgSpriteFilename } });

        // Assert
        expect(config.img.svgSpriteFilename).toBe(svgSpriteFilename);
    });
});

describe('imported assets config', () => {

    it('imported assets directory should be set', () => {
        expect(config.importedAssets.importedAssetsDir).toBe('imported-assets');
    });

    it('imported assets directory can be updated', () => {
        // Arrange
        const importedAssetsDir = 'imports';

        // Act
        config.update({ importedAssets: { importedAssetsDir } });

        // Assert
        expect(config.importedAssets.importedAssetsDir).toBe(importedAssetsDir);
    });

    it('imported assets source glob should be set', () => {
        expect(config.importedAssets.importedAssetsSrcGlob).toBe('node_modules/@justeat/*/');
    });

    it('imported assets source glob can be updated', () => {
        // Arrange
        const importedAssetsSrcGlob = 'node_modules/*/';

        // Act
        config.update({ importedAssets: { importedAssetsSrcGlob } });

        // Assert
        expect(config.importedAssets.importedAssetsSrcGlob).toBe(importedAssetsSrcGlob);
    });

});

describe('service worker config', () => {

    it('is enabled should be false', () => {
        expect(config.sw.isEnabled).toBe(false);
    });

    it('is enabled can be updated', () => {
        // Arrange
        const isEnabled = true;

        // Act
        config.update({ sw: { isEnabled } });

        // Assert
        expect(config.sw.isEnabled).toBe(isEnabled);
    });

    it('service worker directory should be set', () => {
        expect(config.sw.swDir).toBe('sw');
    });

    it('service worker directory can be updated', () => {
        // Arrange
        const swDir = 'service-worker';

        // Act
        config.update({ sw: { swDir } });

        // Assert
        expect(config.sw.swDir).toBe(swDir);
    });

    it('output filename should be set', () => {
        expect(config.sw.outputFile).toBe('service-worker.js');
    });

    it('output filename can be updated', () => {
        // Arrange
        const outputFile = 'sw.js';

        // Act
        config.update({ sw: { outputFile } });

        // Assert
        expect(config.sw.outputFile).toBe(outputFile);
    });

    it('static file globs should be set', () => {
        expect(config.sw.staticFileGlobs).toEqual([]);
    });

    it('static file globs can be updated', () => {
        // Arrange
        const staticFileGlobs = ['./glob', '🛰'];

        // Act
        config.update({ sw: { staticFileGlobs } });

        // Assert
        expect(config.sw.staticFileGlobs).toEqual(staticFileGlobs);
    });

    it('dynamic file regex should be set', () => {
        expect(config.sw.dynamicFileRegex).toEqual([]);
    });

    it('dynamic file regex can be updated', () => {
        // Arrange
        const dynamicFileRegex = ['regex', '🗡'];

        // Act
        config.update({ sw: { dynamicFileRegex } });

        // Assert
        expect(config.sw.dynamicFileRegex).toEqual(dynamicFileRegex);
    });

    it('dynamic file strategy should be set', () => {
        expect(config.sw.dynamicFileStrategy).toBe('cacheFirst');
    });

    it('dynamic file strategy can be updated', () => {
        // Arrange
        const dynamicFileStrategy = 'networkFirst';

        // Act
        config.update({ sw: { dynamicFileStrategy } });

        // Assert
        expect(config.sw.dynamicFileStrategy).toBe(dynamicFileStrategy);
    });

    it('import scripts should be set', () => {
        expect(config.sw.importScripts).toEqual([]);
    });

    it('import scripts can be updated', () => {
        // Arrange
        const importScripts = ['script.js'];

        // Act
        config.update({ sw: { importScripts } });

        // Assert
        expect(config.sw.importScripts).toEqual(importScripts);
    });

    it('cache id should be set', () => {
        expect(config.sw.cacheId).toBe('');
    });

    it('cache id can be updated', () => {
        // Arrange
        const cacheId = 'id-1';

        // Act
        config.update({ sw: { cacheId } });

        // Assert
        expect(config.sw.cacheId).toBe(cacheId);
    });
});

describe('copy config', () => {

    it('copy javascript config should be set', () => {
        expect(config.copy.js).toEqual({});
    });

    it('copy javascript config can be updated', () => {
        // Arrange
        const js = {
            scripts: {
                path: '/libs/**/*',
                dest: '/libs',
                revision: false
            }
        };

        // Act
        config.update({ copy: { js } });

        // Assert
        expect(config.copy.js).toEqual(js);
    });

    it('copy css config should be set', () => {
        expect(config.copy.css).toEqual({});
    });

    it('copy css config can be updated', () => {
        // Arrange
        const css = {
            styles: {
                path: '/libs/**/*',
                dest: '/libs',
                revision: false
            }
        };

        // Act
        config.update({ copy: { css } });

        // Assert
        expect(config.copy.css).toEqual(css);
    });

    it('copy image config should be set', () => {
        expect(config.copy.img).toEqual({});
    });

    it('copy image config can be updated', () => {
        // Arrange
        const img = {
            images: {
                path: '/libs/**/*',
                dest: '',
                revision: false
            }
        };

        // Act
        config.update({ copy: { img } });

        // Assert
        expect(config.copy.img).toEqual(img);
    });

    it('copy fonts config should be set', () => {
        expect(config.copy.fonts).toEqual({});
    });

    it('copy fonts config can be updated', () => {
        // Arrange
        const fonts = {
            fonts: {
                path: '/libs/**/*',
                dest: '',
                revision: false
            }
        };

        // Act
        config.update({ copy: { fonts } });

        // Assert
        expect(config.copy.fonts).toEqual(fonts);
    });

});

describe('documentation config', () => {

    it('root directory should be set', () => {
        expect(config.docs.rootDir).toBe('./docs');
    });

    it('root directory can be updated', () => {
        // Arrange
        const rootDir = 'documentation';

        // Act
        config.update({ docs: { rootDir } });

        // Assert
        expect(config.docs.rootDir).toBe(rootDir);
    });

    it('src directory should be set', () => {
        expect(config.docs.srcDir).toBe('src');
    });

    it('src directory can be updated', () => {
        // Arrange
        const srcDir = 'source';

        // Act
        config.update({ docs: { srcDir } });

        // Assert
        expect(config.docs.srcDir).toBe(srcDir);
    });

    it('dist directory should be set', () => {
        expect(config.docs.distDir).toBe('dist');
    });

    it('dist directory can be updated', () => {
        // Arrange
        const distDir = 'distribution';

        // Act
        config.update({ docs: { distDir } });

        // Assert
        expect(config.docs.distDir).toBe(distDir);
    });

    it('asset directory should be set', () => {
        expect(config.docs.assetDir).toBe('assets/');
    });

    it('asset directory can be updated', () => {
        // Arrange
        const assetDir = 'assets-dir';

        // Act
        config.update({ docs: { assetDir } });

        // Assert
        expect(config.docs.assetDir).toBe(assetDir);
    });

    it('template directory should be set', () => {
        expect(config.docs.templDir).toBe('templates');
    });

    it('template directory can be updated', () => {
        // Arrange
        const templDir = 'tmpl';

        // Act
        config.update({ docs: { templDir } });

        // Assert
        expect(config.docs.templDir).toBe(templDir);
    });

    it('data directory should be set', () => {
        expect(config.docs.dataDir).toBe('data');
    });

    it('data directory can be updated', () => {
        // Arrange
        const dataDir = 'data-dir';

        // Act
        config.update({ docs: { dataDir } });

        // Assert
        expect(config.docs.dataDir).toBe(dataDir);
    });

    it('output assets should be false', () => {
        expect(config.docs.outputAssets).toBe(false);
    });

    it('output assets can be updated', () => {
        // Arrange
        const outputAssets = true;

        // Act
        config.update({ docs: { outputAssets } });

        // Assert
        expect(config.docs.outputAssets).toBe(outputAssets);
    });

    it('remote base should be set', () => {
        expect(config.docs.remoteBase).toBe('');
    });

    it('remote base can be updated', () => {
        // Arrange
        const remoteBase = 'remote';

        // Act
        config.update({ docs: { remoteBase } });

        // Assert
        expect(config.docs.remoteBase).toBe(remoteBase);
    });


    it('helpers should be an object', () => {
        expect(typeof config.docs.helpers).toBe('object');
    });
});

describe('fonts config', () => {

    it('fonts directory should be set', () => {
        expect(config.fonts.fontsDir).toBe('fonts');
    });

    it('fonts directory can be updated', () => {
        // Arrange
        const fontsDir = 'text';

        // Act
        config.update({ fonts: { fontsDir } });

        // Assert
        expect(config.fonts.fontsDir).toBe(fontsDir);
    });

});

describe('browserSync config', () => {

    it('files should be set', () => {
        expect(config.browserSync.files).toEqual([]);
    });

    it('files can be updated', () => {
        // Arrange
        const files = ['/**/*'];

        // Act
        config.update({ browserSync: { files } });

        // Assert
        expect(config.browserSync.files).toBe(files);
    });

    it('proxy should be set', () => {
        expect(config.browserSync.proxy).toBe('');
    });

    it('proxy can be updated', () => {
        // Arrange
        const proxy = 'localhost';

        // Act
        config.update({ browserSync: { proxy } });

        // Assert
        expect(config.browserSync.proxy).toBe(proxy);
    });

    it('reload debounce should be set', () => {
        expect(config.browserSync.reloadDebounce).toBe(1000);
    });

    it('reload debounce can be updated', () => {
        // Arrange
        const reloadDebounce = 9001;

        // Act
        config.update({ browserSync: { reloadDebounce } });

        // Assert
        expect(config.browserSync.reloadDebounce).toBe(reloadDebounce);
    });

});

describe('miscellaneous config', () => {

    it('show file size should be true', () => {
        expect(config.misc.showFileSize).toBe(true);
    });

    it('show file size can be updated', () => {
        // Arrange
        const showFileSize = false;

        // Act
        config.update({ misc: { showFileSize } });

        // Assert
        expect(config.misc.showFileSize).toBe(showFileSize);
    });

    it('show files should be true', () => {
        expect(config.misc.showFiles).toBe(true);
    });

    it('show files can be updated', () => {
        // Arrange
        const showFiles = false;

        // Act
        config.update({ misc: { showFiles } });

        // Assert
        expect(config.misc.showFiles).toBe(showFiles);
    });
});

describe('gulp config', () => {

    it('change event should be a function', () => {
        expect(typeof config.gulp.changeEvent).toBe('function');
    });

    it('change event can be updated', () => {
        // Arrange
        const changeEvent = () => 'changed!';

        // Act
        config.update({ gulp: { changeEvent } });

        // Assert
        expect(config.gulp.changeEvent).toBe(changeEvent);
    });

    it('on error should be a function', () => {
        expect(typeof config.gulp.onError).toBe('function');
    });

    it('on error can be updated', () => {
        // Arrange
        const onError = () => 'error!';

        // Act
        config.update({ gulp: { onError } });

        // Assert
        expect(config.gulp.onError).toBe(onError);
    });

});

describe('config update', () => {

    it('passing empty object should not override entire config', () => {
        // Arrange
        const newConfig = {};

        // Act
        config.update(newConfig);

        // Assert
        expect(config).not.toEqual({});
    });

});
