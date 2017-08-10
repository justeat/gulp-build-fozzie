const baseConfig = require('./config');


const buildPaths = config => {

    const docsSrcDir = `${config.docs.rootDir}/${config.docs.srcDir}`;
    const docsDistDir = `${config.docs.rootDir}/${config.docs.distDir}`;

    return {
        scssSrcDir: `${config.assetSrcDir}/${config.css.scssDir}`,
        cssDistDir: `${config.assetDistDir}/${config.css.cssDir}`,

        jsSrcDir: `${config.assetSrcDir}/${config.js.jsDir}`,
        jsDistDir: `${config.assetDistDir}/${config.js.jsDir}`,

        imgSrcDir: `${config.assetSrcDir}/${config.img.imgDir}`,
        imgDistDir: `${config.assetDistDir}/${config.img.imgDir}`,

        importedAssetsDistDir: `${config.assetDistDir}/${config.importedAssets.importedAssetsDir}`,

        swOutputPath: `${config.webRootDir}`,
        swSrcDir: `${config.assetSrcDir}/${config.sw.swDir}`,
        swDistDir: `${config.assetDistDir}/${config.sw.swDir}`,

        docsSrcDir,
        docsDistDir,
        docsTemplateDir: `${docsSrcDir}/${config.docs.templDir}`,
        docsDataDir: `${docsSrcDir}/${config.docs.dataDir}`,
        docsCssDistDir: `${docsDistDir}/${config.docs.assetDir}${config.css.cssDir}`,
        docsJsDistDir: `${docsDistDir}/${config.docs.assetDir}${config.js.jsDir}`,
        docsImgDistDir: `${docsDistDir}/${config.docs.assetDir}${config.img.imgDir}`,
        docsFontsDistDir: `${docsDistDir}/${config.docs.assetDir}${config.fonts.fontsDir}`,

        fontsSrcDir: `${config.assetSrcDir}/${config.fonts.fontsDir}`,
        fontsDistDir: `${config.assetDistDir}/${config.fonts.fontsDir}`
    };
};

const pathBuilder = () => {

    let paths = buildPaths(baseConfig);

    paths.update = config => {
        const updated = buildPaths(config);
        paths = Object.assign(paths, updated);
    };

    return paths;
};

module.exports = pathBuilder();
