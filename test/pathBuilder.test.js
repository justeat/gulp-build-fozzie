const gutil = require('gulp-util');
const cloneDeep = require('lodash.clonedeep');

// Mock the log function to capture log outputs
const logMock = jest.fn();
gutil.log = logMock;

const pathBuilder = require('../pathBuilder');
const config = require('../config');

const resetConfig = cloneDeep(config); // take exact copy of object, not a reference

afterEach(() => {
    // Reset paths to the default config paths
    pathBuilder.update(resetConfig);
});


describe('`pathBuilder`', () => {
    it('is an object', () => {
        expect(typeof pathBuilder).toBe('object');
    });

    it('is updated if new config options are set', () => {
        // Arrange
        config.css.scssDir = 'myNewPath';

        // Act
        pathBuilder.update(config);

        // Assert
        expect(pathBuilder.scssSrcDir).toBe('src/myNewPath');
    });
});

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

describe('`logger` path', () => {
    it('`jsErrorLoggerSubDir` path should be correct', () => {
        expect(pathBuilder.jsErrorLoggerDir).toBe('dist/js/shared');
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

    it('asset distribution directory path should be correct', () => {
        expect(pathBuilder.docsAssetsDistDir).toBe('./docs/dist/assets/');
    });

    it('css distribution directory path should be correct', () => {
        expect(pathBuilder.docsCssDistDir).toBe('./docs/dist/assets/css');
    });

    it('javascript distribution directory path should be correct', () => {
        expect(pathBuilder.docsJsDistDir).toBe('./docs/dist/assets/js');
    });

    it('image distribution directory path should be correct', () => {
        expect(pathBuilder.docsImgDistDir).toBe('./docs/dist/assets/img');
    });

    it('fonts distribution directory path should be correct', () => {
        expect(pathBuilder.docsFontsDistDir).toBe('./docs/dist/assets/fonts');
    });
});

describe('font paths', () => {
    it('src directory path should be correct', () => {
        expect(pathBuilder.fontsSrcDir).toBe('src/fonts');
    });

    it('distribution directory path should be correct', () => {
        expect(pathBuilder.fontsDistDir).toBe('dist/fonts');
    });
});
