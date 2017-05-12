# gulp-build-fozzie :bear:

[![npm version](https://badge.fury.io/js/%40justeat%2Fgulp-build-fozzie.svg)](https://badge.fury.io/js/%40justeat%2Fgulp-build-fozzie)
[![Build Status](https://travis-ci.com/justeat/gulp-build-fozzie.svg?token=dcwzUq7CHTHZqWbdRCbR&branch=master)](https://travis-ci.com/justeat/gulp-build-fozzie)

Gulp build tasks for use across Fozzie modules.


## Requirements

In order for some of the tasks to be able to run you'll need to prepare your project by following these steps:

1. Install gulp as a dependency

    ```bash
    yarn add gulp
    ```

1. To ensure that the [`scripts:bundle`](#scriptsbundle) task can transpile es2015 code, add the `babel-preset-es2015` preset to the project:

    ```bash
    yarn add babel-preset-es2015
    ```

    Then add a `.babelrc` file, with the `babel-preset-es2015` preset, to the root of your project:

    ```javascript
    {
        "presets": ["es2015"]
    }
    ```

    If you do not add a `.babelrc` file (you may be writing es5 code for example) then the code will be bundled up as is.

1. Add an `.eslintrc` file to the root of your project. The recommended eslint configuration for fozzie modules can be found in [`/fozzie-config/.eslintrc`](https://github.com/justeat/gulp-build-fozzie/fozzie-config/.eslintrc) – simply add the contents of this into your projects `.eslintrc` file to use the JS linting rules we recommend when running the [`scripts:lint`](#scriptslint) task.

1. To use our recommended fozzie stylelint linting rules, add the following into your `package.json` file:

    ```
    "stylelint": {
        "extends": "@justeat/stylelint-config-fozzie"
    }
    ```

    If you wish to extend these rules, you can also define your own `.stylelintrc` file in the root of your project with the rules that you wish to override.


## Setup

To integrate these tasks into your project you need to complete the following steps:

Add `@justeat/gulp-build-fozzie` to your project

```bash
yarn add @justeat/gulp-build-fozzie
```

Inside your gulpfile require and then run `@justeat/gulp-build-fozzie` passing `gulp` as the first argument, You can optionally [pass in options here which will override the defaults](#options).

```js
const gulp = require('gulp');
const build = require('@justeat/gulp-build-fozzie');

build(gulp, /*options*/);
```

That's it! You can now run any of [the Gulp tasks](#the-gulp-tasks).


## The Gulp Tasks

### `css`

Runs the following tasks

- #### `css:lint`

  Lint all CSS (SCSS) in the source directory.

- #### `clean:css`

  Removes any CSS already in the dist directory.

- #### `css:bundle`

  Performs a variety of tasks including;

  - Pull in Eyeglass modules
  - Run postcss plugins
  - Minify the CSS
  - Add hashed version to file name
  - Output bundle to the dist directory

### `scripts`

Runs the following tasks

- #### `scripts:lint`

  Lint all JavaScript in the source directory.

- #### `scripts:test`

  Runs any unit tests found in the JavaScript source directory using Jest.

- #### `clean:scripts`

  Removes any JavaScript already in the dist directory.

- #### `scripts:bundle`

  Performs a variety of tasks including;

  - ES2015 transpilation using Babel
  - Bundle all code into a single file
  - Generate sourcemap files
  - Minify the JavaScript
  - Add hashed version to file name
  - Output bundle to the dist directory

### `images`

Runs the following tasks

- #### `images:optimise`

Optimises all images found in the source directory then copies them to the dist directory.

### `watch`

Runs the `default` task then the following watch tasks.

- #### `watch:css`

Runs the [`css`](#css) task when a CSS file is changed.

- #### `watch:scripts`

Runs the [`scripts`](#scripts) task when a JavaScript file is changed.

- #### `watch:scripts:test`

Runs the [`scripts:lint`](#scriptslint) and [`scripts:test`](#scriptstest) tasks when a JavaScript unit test file is changed.

- #### `watch:images`

Runs the [`images`](#images) task when an image file is changed.

### `watch:docs`

Runs the same tasks as [`watch`](#watch) as well as the following watch tasks.

- #### `watch:docs:templates`

Runs the [`assemble`](#assemble) task when documentation files are changed.


### Development only tasks

- #### `docs`

This will build a fresh copy of any documentation found in the `docs` directory using Assemble, then call the [`watch`](#watch) task which will watch for any file changes, and finally call the [`browserSync:docs`](#browsersyncdocs) task which reloads the web page when changes are detected in the `docs/dist` directory.

- #### `clean:docs`

Removes document files already in the docs dist directory.

- #### `browserSync:docs`

Refreshes the browser when changes to the docs dist directory are detected.

- #### `assemble`

Generates the documentation files.


## Options

Here is the outline of the configuration options, descriptions of each are below.

```js
{
    assetSrcDir,
    assetDistDir,
    css: {
        scssDir,
        cssDir,
        sourcemaps
    },
    js: {
        srcFile,
        jsDir,
        distFile,
        applyRevision
    },
    img: {
        imgDir
    },
    docs: {
        rootDir,
        templDir,
        dataDir,
        outputAssets
    },
    misc: {
        showFileSize,
        showFiles
    },
    gulp: {
        changeEvent,
        onError
    },
    isProduction,
    isDev
}
```


### `assetSrcDir`

Root source directory for your assets.

### `assetDistDir`

Root dist directory for your assets.

### `css`

- #### `scssDir`

  Type: `string`

  Default: `'scss'`

  The directory where your SCSS files reside.

- #### `cssDir`

  Type: `string`

  Default: `'css'`

  The bundled CSS file will be output to this directory.

- #### `sourcemaps`

  Type: `boolean`

  Default: [`isDev`](#other-options)

  Turns sourcemaps on or off.


### `js`

- #### `srcFile`

  Type: `string`

  Default: `'index.js'`

  The filename for the entry point to your es2015 code.

- #### `jsDir`

  Type: `string`

  Default: `'js'`

  Name of the directory that your JavaScript files are kept.

  Compiled JavaScript files will be placed inside a directory with the same name.

- #### `distFile`

  Type: `string`

  Default: `'script.js'`

 The filename for the bundled JavaScript.

- #### `applyRevision`

  Type: `boolean`

  Default: true

  Will add a content hash to the filename.


### `img`

- #### `imgDir`

  Type: `string`

  Default: `'img'`

  Name of the directory that your image files are kept.

  Processed image files will be placed inside a directory with the same name.


### `docs`

- #### `rootDir`

  Type: `string`

  Default: `'docs'`

  Root directory where your documentation files reside.

  By default your source files will be searched for in `docs/src`, and the generated content will be output to `docs/dist`.

- #### `templDir`

  Type: `string`

  Default: `'templates'`

  The name of the directory that your documentation template files are kept.

- #### `dataDir`

  Type: `string`

  Default: `'data'`

  The name of the directory that your documentation data files are kept.

- #### `outputAssets`

  Type: `boolean`

  Default: `'false'`

  Inidicates wether or not the JavaScript, CSS, and image files should be placed into the `docs/dist/assets` directory.


### `misc`

- #### `showFileSize`

  Type: `boolean`

  Default: `true`

  Shoud file sizes be displayed when a task is run?

- #### `showFiles`

  Type: `boolean`

  Default: `true`

  Shoud file names be displayed when a task is run?


### `gulp`

- #### `changeEvent`

  Type: `function`

  Event which fires when a file is modified.

- #### `onError`

  Type: `function`

  Event which fires when an error occurs.


### Other options

The following options are also present in the config but cannot be overridden.

- #### `isProduction`

  Type: `boolean`

  Set to `true` when the `--prod` flag is passed.

- #### `isDev`

  Type: `boolean`

  Set to the opposite value of `isProduction`
