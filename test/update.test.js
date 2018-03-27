const gutil = require('gulp-util');
const cloneDeep = require('lodash.clonedeep');

// Mock the log function to capture log outputs
const logMock = jest.fn();
gutil.log = logMock;

const config = require('../config');

describe('config update', () => {
    it('calling update with no options shouldn’t change the config', () => {
        // Arrange
        const oldConfig = cloneDeep(config);

        config.update();

        expect(oldConfig).toEqual(config);
    });

    it('passing empty object should not override entire config', () => {
        // Arrange
        const newConfig = {};

        // Act
        config.update(newConfig);

        // Assert
        expect(config).not.toEqual({});
    });

    it('When config is updated, isProduction flag should still be false if the value is not reset', () => {
        // Arrange
        const newConfig = {};

        // Act
        config.update(newConfig);

        // Assert
        expect(config.isProduction).toBe(false);
    });

    it('When config is updated, isProduction flag should be true if passed through in config', () => {
        // Arrange
        const newConfig = {
            isProduction: true
        };

        // Act
        config.update(newConfig);

        // Assert
        expect(config.isProduction).toBe(true);
    });
});
