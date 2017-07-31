const pathBuilder = require('../pathBuilder');

describe('css paths', () => {

    it('scss src directory path should be correct', () => {
        expect(pathBuilder.scssSrcDir).toBe('src/scss');
    });

    it('css distribution directory path should be correct', () => {
        expect(pathBuilder.cssDistDir).toBe('dist/css');
    });

});

describe('javascript paths', () => {

    it('src directory path should be correct', () => {
        expect(pathBuilder.jsSrcDir).toBe('src/js');
    });

    it('distribution directory path should be correct', () => {
        expect(pathBuilder.jsDistDir).toBe('dist/js');
    });

});

describe('image paths', () => {

    it('src directory path should be correct', () => {
        expect(pathBuilder.imgSrcDir).toBe('src/img');
    });

    it('distribution directory path should be correct', () => {
        expect(pathBuilder.imgDistDir).toBe('dist/img');
    });

});

describe('service worker paths', () => {

    it('output path should be correct', () => {
        expect(pathBuilder.swOutputPath).toBe('./service-worker.js');
    });

    it('src directory path should be correct', () => {
        expect(pathBuilder.swSrcDir).toBe('src/sw');
    });

    it('distribution directory path should be correct', () => {
        expect(pathBuilder.swDistDir).toBe('dist/sw');
    });

});

describe('documentation paths', () => {

    it('src directory path should be correct', () => {
        expect(pathBuilder.docsSrcDir).toBe('./docs/src');
    });

    it('distribution directory path should be correct', () => {
        expect(pathBuilder.docsDistDir).toBe('./docs/dist');
    });

    it('template directory path should be correct', () => {
        expect(pathBuilder.docsTemplateDir).toBe('./docs/src/templates');
    });

    it('data directory path should be correct', () => {
        expect(pathBuilder.docsDataDir).toBe('./docs/src/data');
    });

    it('css distribution directory path should be correct', () => {
        expect(pathBuilder.docsCssDistDir).toBe('./docs/dist/assets/dist/css');
    });

    it('javascript distribution directory path should be correct', () => {
        expect(pathBuilder.docsJsDistDir).toBe('./docs/dist/assets/dist/js');
    });

    it('image distribution directory path should be correct', () => {
        expect(pathBuilder.docsImgDistDir).toBe('./docs/dist/assets/dist/img');
    });

});
