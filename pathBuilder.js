const baseConfig = require('./config');


const buildPaths = config => {
    const docsSrcDir = `${config.docs.rootDir}/${config.docs.srcDir}`;
    const docsDistDir = `${config.docs.rootDir}/${config.docs.distDir}`;
    const docsAssetsDistDir = `${docsDistDir}/${config.docs.assetDir}`;

    return {
        scssSrcDir: `${config.assetSrcDir}/${config.css.scssDir}`,
        cssDistDir: `${config.assetDistDir}/${config.css.cssDir}`,

        jsSrcDir: `${config.assetSrcDir}/${config.js.jsDir}`,
        jsDistDir: `${config.assetDistDir}/${config.js.jsDir}`,

        jsErrorLoggerDir: `${config.assetDistDir}/${config.logger.dir}`,

        imgSrcDir: `${config.assetSrcDir}/${config.img.imgDir}`,
        imgDistDir: `${config.assetDistDir}/${config.img.imgDir}`,

        swOutputPath: `${config.webRootDir}`,
        swSrcDir: `${config.assetSrcDir}/${config.sw.swDir}`,
        swDistDir: `${config.assetDistDir}/${config.sw.swDir}`,

        docsSrcDir,
        docsDistDir,
        docsTemplateDir: `${docsSrcDir}/${config.docs.templDir}`,
        docsDataDir: `${docsSrcDir}/${config.docs.dataDir}`,
        docsAssetsDistDir,
        docsCssDistDir: `${docsAssetsDistDir}${config.css.cssDir}`,
        docsJsDistDir: `${docsAssetsDistDir}${config.js.jsDir}`,
        docsImgDistDir: `${docsAssetsDistDir}${config.img.imgDir}`,
        docsFontsDistDir: `${docsAssetsDistDir}${config.fonts.fontsDir}`,

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
