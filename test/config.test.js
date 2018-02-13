const config = require('../config');

describe('environment config', () => {

    it('`isProduction` should be false', () => {
        expect(config.isProduction).toBe(false);
    });

    it('`isDev` should be true', () => {
        expect(config.isDev).toBe(true);
    });

    it('`webRootDir` should be `.`', () => {
        expect(config.webRootDir).toBe('.');
    });

    it('`webRootDir` can be updated', () => {
        // Arrange
        const webRootDir = './';

        // Act
        config.update({ webRootDir });

        // Assert
        expect(config.webRootDir).toBe(webRootDir);
    });

    it('`assetSrcDir` should be set', () => {
        expect(config.assetSrcDir).toBe('src');
    });

    it('`assetSrcDir` can be updated', () => {
        // Arrange
        const assetSrcDir = 'source';

        // Act
        config.update({ assetSrcDir });

        // Assert
        expect(config.assetSrcDir).toBe(assetSrcDir);
    });

    it('`assetDistDir` should be set', () => {
        expect(config.assetDistDir).toBe('dist');
    });

    it('`assetDistDir` can be updated', () => {
        // Arrange
        const assetDistDir = 'distribution';

        // Act
        config.update({ assetDistDir });

        // Assert
        expect(config.assetDistDir).toBe(assetDistDir);
    });

    it('`applyRevision` should be true', () => {
        expect(config.applyRevision).toBe(true);
    });

    it('`applyRevision` can be updated', () => {
        // Arrange
        const applyRevision = false;

        // Act
        config.update({ applyRevision });

        // Assert
        expect(config.applyRevision).toBe(applyRevision);
    });

    it('`packageVersion` should exist', () => {
        expect(config.packageVersion).toBeDefined();
    });

    it('`packageVersion` should return a package version', () => {
        // Arrange
        const packageVersion = 'Some package version';

        // Act
        config.update({ packageVersion });

        // Assert
        expect(config.packageVersion).toBe(packageVersion);
    });
});

describe('css config', () => {

    it('`scssDir` should be set', () => {
        expect(config.css.scssDir).toBe('scss');
    });

    it('`scssDir` can be updated', () => {
        // Arrange
        const scssDir = 'sass';

        // Act
        config.update({ css: { scssDir } });

        // Assert
        expect(config.css.scssDir).toBe(scssDir);
    });

    it('`cssDir` should be set', () => {
        expect(config.css.cssDir).toBe('css');
    });

    it('`cssDir` can be updated', () => {
        // Arrange
        const cssDir = 'styles';

        // Act
        config.update({ css: { cssDir } });

        // Assert
        expect(config.css.cssDir).toBe(cssDir);
    });

    it('`lintPaths` should be set', () => {
        expect(config.css.lintPaths).toEqual(['']);
    });

    it('`lintPaths` can be updated', () => {
        // Arrange
        const lintPaths = ['./lint-me', '🦄'];

        // Act
        config.update({ css: { lintPaths } });

        // Assert
        expect(config.css.lintPaths).toEqual(lintPaths);
    });

    it('`sourcemaps` should be true', () => {
        expect(config.css.sourcemaps).toBe(true);
    });

    it('`sourcemaps` can be updated', () => {
        // Arrange
        const sourcemaps = false;

        // Act
        config.update({ css: { sourcemaps } });

        // Assert
        expect(config.css.sourcemaps).toBe(sourcemaps);
    });

    it('`usePackageVersion` should exist', () => {
        expect(config.css.usePackageVersion).toBeDefined();
    });

    it('`usePackageVersion` should be set to `false` by default', () => {
        expect(config.css.usePackageVersion).toBe(false);
    });

    it('`usePackageVersion` can be updated', () => {
        // Arrange
        const usePackageVersion = true;

        // Act
        config.update({ css: { usePackageVersion } });

        // Assert
        expect(config.css.usePackageVersion).toBe(usePackageVersion);
    });
});

describe('javascript config', () => {

    it('`srcPath` for bundle should be set', () => {
        expect(config.js.files.main.srcPath).toBe('index.js');
    });

    it('`srcPath` can be updated', () => {
        // Arrange
        const srcPath = 'app.js';

        // Act
        config.update({ js: { files: { main: { srcPath } } } });

        // Assert
        expect(config.js.files.main.srcPath).toBe(srcPath);
    });

    it('`distFile` should be set', () => {
        expect(config.js.files.main.distFile).toBe('script.js');
    });

    it('`distFile` can be updated', () => {
        // Arrange
        const distFile = 'app.js';

        // Act
        config.update({ js: { files: { main: { distFile } } } });

        // Assert
        expect(config.js.files.main.distFile).toBe(distFile);
    });

    it('`jsDir` should be set', () => {
        expect(config.js.jsDir).toBe('js');
    });

    it('`jsDir` can be updated', () => {
        // Arrange
        const jsDir = 'scripts';

        // Act
        config.update({ js: { jsDir } });

        // Assert
        expect(config.js.jsDir).toBe(jsDir);
    });

    it('`lintPaths` should be set', () => {
        expect(config.js.lintPaths).toEqual(['']);
    });

    it('`lintPaths` can be updated', () => {
        // Arrange
        const lintPaths = ['./lint-me', '🐝'];

        // Act
        config.update({ js: { lintPaths } });

        // Assert
        expect(config.js.lintPaths).toEqual(lintPaths);
    });

    it('`usePackageVersion` should exist', () => {
        expect(config.js.usePackageVersion).toBeDefined();
    });

    it('`usePackageVersion` should be set to `false` by default', () => {
        expect(config.js.usePackageVersion).toBe(false);
    });

    it('`usePackageVersion` can be updated', () => {
        // Arrange
        const usePackageVersion = true;

        // Act
        config.update({ js: { usePackageVersion } });

        // Assert
        expect(config.js.usePackageVersion).toBe(usePackageVersion);
    });

    it('`stripDebug` should exist', () => {
        expect(config.js.stripDebug).toBeDefined();
    });

    it('`stripDebug` should be set to `true` by default', () => {
        expect(config.js.stripDebug).toBe(true);
    });

    it('`stripDebug` can be updated', () => {
        // Arrange
        const stripDebug = false;

        // Act
        config.update({ js: { stripDebug } });

        // Assert
        expect(config.js.stripDebug).toBe(stripDebug);
    });

});


describe('`logger` config', () => {
    it('should exist', () => {
        expect(config.logger).toBeDefined();
    });

    // `logger.dir`
    it('`logger.dir` should exist', () => {
        expect(config.logger.dir).toBeDefined();
    });

    it('`logger.dir` can be updated', () => {
        // Arrange
        const dir = 'Some other directory';

        // Act
        config.update({ flogger: { dir } });

        // Assert
        expect(config.logger.dir).toBe(dir);
    });

    // `logger.subDir`
    it('`logger.subDir` should exist', () => {
        expect(config.logger.subDir).toBeDefined();
    });

    it('`logger.subDir` can be updated', () => {
        // Arrange
        const subDir = 'Some other sub directory';

        // Act
        config.update({ flogger: { subDir } });

        // Assert
        expect(config.logger.subDir).toBe(subDir);
    });

    // `logger.file`
    it('`logger.file` should exist', () => {
        expect(config.logger.subDir).toBeDefined();
    });

    it('`logger.file` can be updated', () => {
        // Arrange
        const file = 'Some new file';

        // Act
        config.update({ flogger: { file } });

        // Assert
        expect(config.logger.file).toBe(file);
    });
});

describe('image config', () => {

    it('`imgDir` should be set', () => {
        expect(config.img.imgDir).toBe('img');
    });

    it('`imgDir` can be updated', () => {
        // Arrange
        const imgDir = 'images';

        // Act
        config.update({ img: { imgDir } });

        // Assert
        expect(config.img.imgDir).toBe(imgDir);
    });

    it('`svgSpriteFilename` should be set', () => {
        expect(config.img.svgSpriteFilename).toBe('sprite.svg');
    });

    it('`svgSpriteFilename` can be updated', () => {
        // Arrange
        const svgSpriteFilename = 'fairy.svg';

        // Act
        config.update({ img: { svgSpriteFilename } });

        // Assert
        expect(config.img.svgSpriteFilename).toBe(svgSpriteFilename);
    });

});

describe('imported assets config', () => {

    it('`importedAssetsSrcGlob` should be set', () => {
        expect(config.importedAssets.importedAssetsSrcGlob).toBe('node_modules/@justeat/*/');
    });

    it('`importedAssetsSrcGlob` can be updated', () => {
        // Arrange
        const importedAssetsSrcGlob = 'node_modules/*/';

        // Act
        config.update({ importedAssets: { importedAssetsSrcGlob } });

        // Assert
        expect(config.importedAssets.importedAssetsSrcGlob).toBe(importedAssetsSrcGlob);
    });

    it('`verbose` should be true', () => {
        expect(config.importedAssets.verbose).toBe(true);
    });

    it('`verbose` can be updated', () => {
        // Arrange
        const verbose = false;

        // Act
        config.update({ importedAssets: { verbose } });

        // Assert
        expect(config.importedAssets.verbose).toBe(verbose);
    });

});

describe('service worker config', () => {

    it('`isEnabled` should be false', () => {
        expect(config.sw.isEnabled).toBe(false);
    });

    it('`isEnabled` can be updated', () => {
        // Arrange
        const isEnabled = true;

        // Act
        config.update({ sw: { isEnabled } });

        // Assert
        expect(config.sw.isEnabled).toBe(isEnabled);
    });

    it('`swDir` should be set', () => {
        expect(config.sw.swDir).toBe('sw');
    });

    it('`swDir` can be updated', () => {
        // Arrange
        const swDir = 'service-worker';

        // Act
        config.update({ sw: { swDir } });

        // Assert
        expect(config.sw.swDir).toBe(swDir);
    });

    it('`outputFile` should be set', () => {
        expect(config.sw.outputFile).toBe('service-worker.js');
    });

    it('`outputFile` can be updated', () => {
        // Arrange
        const outputFile = 'sw.js';

        // Act
        config.update({ sw: { outputFile } });

        // Assert
        expect(config.sw.outputFile).toBe(outputFile);
    });

    it('`staticFileGlobs` should be set', () => {
        expect(config.sw.staticFileGlobs).toEqual([]);
    });

    it('`staticFileGlobs` can be updated', () => {
        // Arrange
        const staticFileGlobs = ['./glob', '🛰'];

        // Act
        config.update({ sw: { staticFileGlobs } });

        // Assert
        expect(config.sw.staticFileGlobs).toEqual(staticFileGlobs);
    });

    it('`dynamicFileRegex` should be set', () => {
        expect(config.sw.dynamicFileRegex).toEqual([]);
    });

    it('`dynamicFileRegex` can be updated', () => {
        // Arrange
        const dynamicFileRegex = ['regex', '🗡'];

        // Act
        config.update({ sw: { dynamicFileRegex } });

        // Assert
        expect(config.sw.dynamicFileRegex).toEqual(dynamicFileRegex);
    });

    it('`dynamicFileStrategy` should be set', () => {
        expect(config.sw.dynamicFileStrategy).toBe('cacheFirst');
    });

    it('`dynamicFileStrategy` can be updated', () => {
        // Arrange
        const dynamicFileStrategy = 'networkFirst';

        // Act
        config.update({ sw: { dynamicFileStrategy } });

        // Assert
        expect(config.sw.dynamicFileStrategy).toBe(dynamicFileStrategy);
    });

    it('`importScripts` should be set', () => {
        expect(config.sw.importScripts).toEqual([]);
    });

    it('`importScripts` can be updated', () => {
        // Arrange
        const importScripts = ['script.js'];

        // Act
        config.update({ sw: { importScripts } });

        // Assert
        expect(config.sw.importScripts).toEqual(importScripts);
    });

    it('`cacheId` should be set', () => {
        expect(config.sw.cacheId).toBe('');
    });

    it('`cacheId` can be updated', () => {
        // Arrange
        const cacheId = 'id-1';

        // Act
        config.update({ sw: { cacheId } });

        // Assert
        expect(config.sw.cacheId).toBe(cacheId);
    });
});

describe('copy config', () => {

    it('copy js config should be set', () => {
        expect(config.copy.js).toEqual({});
    });

    it('copy js config can be updated', () => {
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

    it('copy img config should be set', () => {
        expect(config.copy.img).toEqual({});
    });

    it('copy img config can be updated', () => {
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

    it('`rootDir` should be set', () => {
        expect(config.docs.rootDir).toBe('./docs');
    });

    it('`rootDir` can be updated', () => {
        // Arrange
        const rootDir = 'documentation';

        // Act
        config.update({ docs: { rootDir } });

        // Assert
        expect(config.docs.rootDir).toBe(rootDir);
    });

    it('`srcDir` should be set', () => {
        expect(config.docs.srcDir).toBe('src');
    });

    it('`srcDir` can be updated', () => {
        // Arrange
        const srcDir = 'source';

        // Act
        config.update({ docs: { srcDir } });

        // Assert
        expect(config.docs.srcDir).toBe(srcDir);
    });

    it('`distDir` should be set', () => {
        expect(config.docs.distDir).toBe('dist');
    });

    it('`distDir` can be updated', () => {
        // Arrange
        const distDir = 'distribution';

        // Act
        config.update({ docs: { distDir } });

        // Assert
        expect(config.docs.distDir).toBe(distDir);
    });

    it('`assetDir` should be set', () => {
        expect(config.docs.assetDir).toBe('assets/');
    });

    it('`assetDir` can be updated', () => {
        // Arrange
        const assetDir = 'assets-dir';

        // Act
        config.update({ docs: { assetDir } });

        // Assert
        expect(config.docs.assetDir).toBe(assetDir);
    });

    it('`templDir` should be set', () => {
        expect(config.docs.templDir).toBe('templates');
    });

    it('`templDir` can be updated', () => {
        // Arrange
        const templDir = 'tmpl';

        // Act
        config.update({ docs: { templDir } });

        // Assert
        expect(config.docs.templDir).toBe(templDir);
    });

    it('`dataDir` should be set', () => {
        expect(config.docs.dataDir).toBe('data');
    });

    it('`dataDir` can be updated', () => {
        // Arrange
        const dataDir = 'data-dir';

        // Act
        config.update({ docs: { dataDir } });

        // Assert
        expect(config.docs.dataDir).toBe(dataDir);
    });

    it('`outputAssets` should be false', () => {
        expect(config.docs.outputAssets).toBe(false);
    });

    it('`outputAssets` can be updated', () => {
        // Arrange
        const outputAssets = true;

        // Act
        config.update({ docs: { outputAssets } });

        // Assert
        expect(config.docs.outputAssets).toBe(outputAssets);
    });

    it('`remoteBase` should be set', () => {
        expect(config.docs.remoteBase).toBe('');
    });

    it('`remoteBase` can be updated', () => {
        // Arrange
        const remoteBase = 'remote';

        // Act
        config.update({ docs: { remoteBase } });

        // Assert
        expect(config.docs.remoteBase).toBe(remoteBase);
    });


    it('`helpers` should be an object', () => {
        expect(typeof config.docs.helpers).toBe('object');
    });
});

describe('fonts config', () => {

    it('`fontsDir` should be set', () => {
        expect(config.fonts.fontsDir).toBe('fonts');
    });

    it('`fontsDir` can be updated', () => {
        // Arrange
        const fontsDir = 'text';

        // Act
        config.update({ fonts: { fontsDir } });

        // Assert
        expect(config.fonts.fontsDir).toBe(fontsDir);
    });

});

describe('browserSync config', () => {

    it('`files` should be set', () => {
        expect(config.browserSync.files).toEqual([]);
    });

    it('`files` can be updated', () => {
        // Arrange
        const files = ['/**/*'];

        // Act
        config.update({ browserSync: { files } });

        // Assert
        expect(config.browserSync.files).toBe(files);
    });

    it('`proxy` should be set', () => {
        expect(config.browserSync.proxy).toBe('');
    });

    it('`proxy` can be updated', () => {
        // Arrange
        const proxy = 'localhost';

        // Act
        config.update({ browserSync: { proxy } });

        // Assert
        expect(config.browserSync.proxy).toBe(proxy);
    });

    it('`reloadDebounce` should be set', () => {
        expect(config.browserSync.reloadDebounce).toBe(1000);
    });

    it('`reloadDebounce` can be updated', () => {
        // Arrange
        const reloadDebounce = 9001;

        // Act
        config.update({ browserSync: { reloadDebounce } });

        // Assert
        expect(config.browserSync.reloadDebounce).toBe(reloadDebounce);
    });

});

describe('miscellaneous config', () => {

    it('`showFileSize` should be true', () => {
        expect(config.misc.showFileSize).toBe(true);
    });

    it('`showFileSize`can be updated', () => {
        // Arrange
        const showFileSize = false;

        // Act
        config.update({ misc: { showFileSize } });

        // Assert
        expect(config.misc.showFileSize).toBe(showFileSize);
    });

    it('`showFiles` should be true', () => {
        expect(config.misc.showFiles).toBe(true);
    });

    it('`showFiles` can be updated', () => {
        // Arrange
        const showFiles = false;

        // Act
        config.update({ misc: { showFiles } });

        // Assert
        expect(config.misc.showFiles).toBe(showFiles);
    });
});

describe('gulp config', () => {

    it('`changeEvent` should be a function', () => {
        expect(typeof config.gulp.changeEvent).toBe('function');
    });

    it('`changeEvent` can be updated', () => {
        // Arrange
        const changeEvent = () => 'changed!';

        // Act
        config.update({ gulp: { changeEvent } });

        // Assert
        expect(config.gulp.changeEvent).toBe(changeEvent);
    });

    it('`onError` should be a function', () => {
        expect(typeof config.gulp.onError).toBe('function');
    });

    it('`onError` can be updated', () => {
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
