const gutil = require('gulp-util');

// Mock the log function
const logMock = jest.fn();
gutil.log = logMock;

const config = require('../config');

// Reset logMock back to initial state after each test
beforeEach(() => {
    logMock.mockReset();
});

describe('gulp config', () => {
    describe('`changeEvent`', () => {
        it('should be a function', () => {
            expect(typeof config.gulp.changeEvent).toBe('function');
        });

        it('should call gutil.log when called', () => {
            // Arrange
            const filePath = '/myCSSFile.css';

            // Act
            config.gulp.changeEvent(filePath);

            // Assert
            expect(logMock).toHaveBeenCalled();
        });

        it('should output a log message in the expected format', () => {
            // Arrange
            const filePath = '/myCSSFile.css';

            const message = `${gutil.colors.cyan.bold('❯❯ File: myCSSFile.css')} was ${gutil.colors.magenta('changed')}`;

            // Act
            config.gulp.changeEvent(filePath);
            const logOutput = logMock.mock.calls[1].join(' ');

            // Assert
            // This string is crazy weird because of the weird ansi colour wrapping on the output
            // String should be in format "❯❯ File: ${path} was ${eventType}"
            expect(logOutput).toBe(message);
        });

        it('can be updated with another function', () => {
            // Arrange
            const changeEvent = () => 'changed!';

            // Act
            config.update({ gulp: { changeEvent } });

            // Assert
            expect(config.gulp.changeEvent).toBe(changeEvent);
        });
    });


    describe('`onError`', () => {
        it('should be a function', () => {
            expect(typeof config.gulp.onError).toBe('function');
        });

        it('should call a logging function', () => {
            // Arrange
            const error = {
                plugin: 'myPlugin',
                message: 'Something went wrong!'
            };

            // Act
            config.gulp.onError(error);

            // Assert
            expect(logMock).toHaveBeenCalled();
        });

        it('should send an exit code of 1 to `process.exit` if production environment variable and status code 1 are set', () => {
            const error = {
                plugin: 'myPlugin',
                message: 'Something went wrong!',
                status: 1
            };
            const processMock = jest.fn();
            process.exit = processMock;
            gutil.env.prod = true;

            // Act
            config.gulp.onError(error);

            // Assert
            expect(processMock).toHaveBeenCalled();
            expect(processMock.mock.calls[0][0]).toBe(1);
        });

        it('should output a log message in the expected format', () => {
            const error = {
                plugin: 'myPlugin',
                message: 'Something went wrong!',
                status: 1
            };
            const message = gutil.colors.red.bold(`Error in plugin: ${gutil.colors.cyan.bold('\'myPlugin\'')}`);

            // Act
            config.gulp.onError(error);
            const logOutput = logMock.mock.calls[1].join(' ');

            // Assert
            // This string is crazy weird because of the weird ansi colour wrapping on the output
            // String should be in format "Error in plugin ${pluginName}"
            expect(logOutput).toBe(message);
        });

        it('should log extra error information if those are set in the error event', () => {
            const error = {
                line: 20,
                column: 42,
                relativePath: '/my/Path/',
                plugin: 'myPlugin',
                message: 'Something went wrong!',
                status: 1
            };
            const message = gutil.colors.red.bold(`on ${gutil.colors.cyan.bold('line 20, column 42')} of ${gutil.colors.cyan.bold('\'/my/Path/\'')}`);

            // Act
            config.gulp.onError(error);
            const logOutput = logMock.mock.calls[2].join(' ');

            // Assert
            // This string is crazy weird because of the weird ansi colour wrapping on the output
            // String should be in format "on line ${lineNum}, column ${columnNum}`)} of '${path}'"
            expect(logOutput).toBe(message);
        });

        it('should send an `end` event if `this.emit` is available', () => {
            const error = {
                line: 20,
                column: 42,
                relativePath: '/my/Path/',
                plugin: 'myPlugin',
                message: 'Something went wrong!',
                status: 1
            };
            const emitMock = jest.fn();
            const thisMock = {};
            thisMock.emit = emitMock;

            // Act
            (config.gulp.onError).apply(thisMock, [error]);

            // Assert
            expect(emitMock).toHaveBeenCalled();
            expect(emitMock.mock.calls[0][0]).toBe('end');
        });

        it('can be updated', () => {
            // Arrange
            const onError = () => 'error!';

            // Act
            config.update({ gulp: { onError } });

            // Assert
            expect(config.gulp.onError).toBe(onError);
        });
    });
});
