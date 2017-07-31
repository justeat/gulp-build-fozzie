const config = require('./config');

const docsSrcDir = `${config.docs.rootDir}/${config.docs.srcDir}`;
const docsDistDir = `${config.docs.rootDir}/${config.docs.distDir}`;

var pathBuilder = {

    scssSrcDir: `${config.assetSrcDir}/${config.css.scssDir}`,
    cssDistDir: `${config.assetDistDir}/${config.css.cssDir}`,

    jsSrcDir: `${config.assetSrcDir}/${config.js.jsDir}`,
    jsDistDir: `${config.assetDistDir}/${config.js.jsDir}`,

    imgSrcDir: `${config.assetSrcDir}/${config.img.imgDir}`,
    imgDistDir: `${config.assetDistDir}/${config.img.imgDir}`,

    swOutputPath: `${config.webRootDir}/${config.sw.outputFile}`,
    swSrcDir: `${config.assetSrcDir}/${config.sw.swDir}`,
    swDistDir: `${config.assetDistDir}/${config.sw.swDir}`,

    docsSrcDir,
    docsDistDir,
    docsTemplateDir: `${docsSrcDir}/${config.docs.templDir}`,
    docsDataDir: `${docsSrcDir}/${config.docs.dataDir}`,
    docsCssDistDir: `${docsDistDir}/${config.docs.assetDir}${config.docs.assetDistDir}/${config.css.cssDir}`,
    docsJsDistDir: `${docsDistDir}/${config.docs.assetDir}${config.docs.assetDistDir}/${config.js.jsDir}`,
    docsImgDistDir: `${docsDistDir}/${config.docs.assetDir}${config.docs.assetDistDir}/${config.img.imgDir}`
};

module.exports = pathBuilder;
