# gulp-build-fozzie :bear:

Gulp build tasks for use across Fozzie modules

## Setup

To integrate these tasks into your project you need to complete the following steps

1. Add `gulp-build-fozzie` to your project

    ```bash
    yarn add gulp-build-fozzie
    ```

1. Inside your gulpfile require and execute `gulp-build-fozzie`

    ```js
    const gulp = require('gulp');

    require('gulp-build-fozzie')();
    ```

1. That's it! You can now run any of the Fozzie tasks.

## The Fozzie tasks

### `css:lint`

Lint all CSS (SCSS) in the `scss` directory.

### `scripts`

Runs the following tasks

#### `scripts:lint`

Lint all JavaScript in the `js` directory.

#### `scripts:test`

Runs any unit tests found using Jest.

#### `scripts:bundle`

Performs a variety of tasks including;

- ES2015 transpilation using Babel
- Bundle all code into a single file
- Generate sourcemap files
- Minify the JavaScript
- Add hashed version to file name

#### `clean:scripts`

Removes any JavaScript already in the `dist/js` directory.
