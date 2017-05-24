const config = require('./config');

const docsSrcDir = `${config.docs.rootDir}/${config.assetSrcDir}`;
const docsDistDir = `${config.docs.rootDir}/${config.assetDistDir}`;

var pathBuilder = {

    scssSrcDir: `${config.assetSrcDir}/${config.css.scssDir}`,
    cssDistDir: `${config.assetDistDir}/${config.css.cssDir}`,

    jsSrcDir: `${config.assetSrcDir}/${config.js.jsDir}`,
    jsDistDir: `${config.assetDistDir}/${config.js.jsDir}`,

    imgSrcDir: `${config.assetSrcDir}/${config.img.imgDir}`,
    imgDistDir: `${config.assetDistDir}/${config.img.imgDir}`,

    swSrcDir: `${config.assetSrcDir}/${config.sw.swDir}`,
    swDistDir: `${config.assetDistDir}/${config.sw.swDir}`,

    docsSrcDir,
    docsDistDir,
    docsTemplatesDir: `${docsSrcDir}/${config.docs.templDir}`,
    docsCssDistDir: `${docsDistDir}/assets/${config.css.cssDir}`,
    docsJsDistDir: `${docsDistDir}/assets/${config.js.jsDir}`,
    docsImgDistDir: `${docsDistDir}/assets/${config.img.imgDir}`
};

module.exports = pathBuilder;
