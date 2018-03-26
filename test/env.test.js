const gutil = require('gulp-util');

gutil.env.prod = true;

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
});
