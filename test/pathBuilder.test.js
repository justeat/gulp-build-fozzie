const pathBuilder = require('../pathBuilder');

describe('css paths', () => {

    it('scss source directory path should be correct', () => {
        expect(pathBuilder.scssSrcDir).toBe('src/scss');
    });

    it('css distribution directory path should be correct', () => {
        expect(pathBuilder.cssDistDir).toBe('dist/css');
    });

});

describe('javascript paths', () => {

    it('source directory path should be correct', () => {
        expect(pathBuilder.jsSrcDir).toBe('src/js');
    });

    it('distribution directory path should be correct', () => {
        expect(pathBuilder.jsDistDir).toBe('dist/js');
    });

});

describe('image paths', () => {

    it('source directory path should be correct', () => {
        expect(pathBuilder.imgSrcDir).toBe('src/img');
    });

});

describe('documentation paths', () => {

    it('source directory path should be correct', () => {
        expect(pathBuilder.docsSrcDir).toBe('docs/src');
    });

    it('distribution directory path should be correct', () => {
        expect(pathBuilder.docsDistDir).toBe('docs/dist');
    });

    it('template directory path should be correct', () => {
        expect(pathBuilder.docsTemplatesDir).toBe('docs/src/templates');
    });

    it('css distribution directory path should be correct', () => {
        expect(pathBuilder.docsCssDistDir).toBe('docs/dist/assets/css');
    });

    it('javascript distribution directory path should be correct', () => {
        expect(pathBuilder.docsJsDistDir).toBe('docs/dist/assets/js');
    });

});
