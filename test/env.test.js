const gutil = require('gulp-util');

// Act – set environment variables up
gutil.env.prod = true;
gutil.env.lintModules = true;

// Mock the log function to capture log outputs
const logMock = jest.fn();
gutil.log = logMock;

const config = require('../config');


describe('Environment variable', () => {
    describe('Setting `gutil.env.prod`', () => {
        it('Will set `isProduction` to true', () => {
            // Assert
            expect(config.isProduction).toBe(true);
        });
    });

    describe('Setting `gutil.env.lintModules`', () => {
        it('Will set `lintPaths` to include sub-module scss', () => {
            // Assert
            expect(config.css.lintPaths).toEqual(['node_modules/@justeat/**/*.scss', '!node_modules/@justeat/**/node_modules/**/*.scss']);
        });

        it('if config is updated, lintPaths should still include node_modules folder', () => {
            // Arrange
            const newConfig = {
                css: {
                    lintPaths: ['./myFolder/']
                }
            };

            // Act
            config.update(newConfig);

            // Assert
            expect(config.css.lintPaths).toEqual(['node_modules/@justeat/**/*.scss', '!node_modules/@justeat/**/node_modules/**/*.scss', './myFolder/']);
        });
    });
});
