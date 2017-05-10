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

1. To ensure that the [`scripts:bundle`](#scriptsbundle) task can run, add the `babel-preset-es2015` preset:

    ```bash
    yarn add babel-preset-es2015
    ```

    Then add a `.babelrc` file to the root of your project:

    ```javascript
    {
        "presets": ["es2015"]
    }
    ```

1. Add an `.eslintrc` file to the root of your project.  The recommended eslint configuration for fozzie modules can be found in [`/fozzie-config/.eslintrc`](https://github.com/justeat/gulp-build-fozzie/fozzie-config/.eslintrc) – simply add this into your projects `.eslintrc` file to use the JS linting rules we recommend when running the [`scripts:lint`](#scriptslint) task.

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

Inside your gulpfile require and then execute `@justeat/gulp-build-fozzie`, you can [pass in options at this point to override the defaults](#options)

```js
const build = require('@justeat/gulp-build-fozzie')

build(/*options*/);
```

That's it! You can now run any of [the Fozzie tasks](#the-fozzie-tasks).


## The Gulp Tasks

### `css`

Runs the following tasks

- #### `css:lint`

  Lint all CSS (SCSS) in the `scss` directory.

### `scripts`

Runs the following tasks

- #### `scripts:lint`

  Lint all JavaScript in the `js` directory.

- #### `scripts:test`

  Runs any unit tests found under `src/js` using Jest.

- #### `scripts:bundle`

  Performs a variety of tasks including;

  - ES2015 transpilation using Babel
  - Bundle all code into a single file
  - Generate sourcemap files
  - Minify the JavaScript
  - Add hashed version to file name
  - Output bundle to the `dist/js` directory

- #### `clean:scripts`

  Removes any JavaScript already in the `dist/js` directory.

### `images`

Runs the following tasks

- #### `images:optimise`

Optimises all images found in the `src/img` directory then copies them to the `dist/img` directory.

### `docs` - _available in development only_

Runs the following tasks

- #### `clean:docs`

  Removes document files already in the `docs/dist` directory.

- #### `assemble`

  Generates the documentation files.


## Options

Here is the outline of the configuration options, descriptions of each are below.

```js
{
    css: {
        srcDir,
        distDir,
        autoprefixer,
        sourcemaps
    },
    js: {
        srcDir,
        srcFile,
        distDir,
        distFile,
        applyRevision
    },
    img: {
        srcDir,
        distDir
    },
    docs: {
        srcDir,
        distDir,
        templDir,
        cssUrl,
        jsUrl
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


### `css`

- #### `srcDir`

  Type: `string`

  Default: `'src/scss'`

  The directory where your SCSS files reside.

- #### `distDir`

  Type: `string`

  Default: `'dist/css'`

  The bundled CSS file will be output to this directory.

- #### `autoprefixer`

  Type: `array`

  Default: `['> 5%', 'last 2 versions', 'ie > 7', 'Safari >= 8']`

  Options which are passed to auto prefixer.

- #### `sourcemaps`

  Type: `boolean`

  Default: [`isDev`](#other-options)

  Turns sourcemaps on or off.


### `js`

- #### `srcDir`

  Type: `string`

  Default: `'src/js'`

  The directory where your es2015 files reside.

- #### `srcFile`

  Type: `string`

  Default: `'index.js'`

  The filename for the entry point to your es2015 code.

- #### `distDir`

  Type: `string`

  Default: `'dist/js'`

  The bundled JavaScript file will be output to this directory.

- #### `distFile`

  Type: `string`

  Default: `'script.js'`

 The filename for the bundled JavaScript.

- #### `applyRevision`

  Type: `boolean`

  Default: true

  Will add a content hash to the filename.


### `img`

- #### `srcDir`

  Type: `string`

  Default: `'src/img'`

  The directory where your image files reside.

- #### `distDir`

  Type: `string`

  Default: `'dist/img'`

  The processed image files will be output to this directory.


### `docs`

- #### `srcDir`

  Type: `string`

  Default: `'docs/src'`

  The directory where your documentation files reside.

- #### `distDir`

  Type: `string`

  Default: `'docs/dist'`

  The documentation files will be output to this directory once they have been processed.

- #### `templDir`

  Type: `string`

  Default: `'docs/src/templates'`

  The directory where your documentations templates files reside.

- #### `cssUrl`

  Type: `string`

  Default: `''`

  The URL to use for the documentation CSS.

- #### `jsUrl`

  Type: `string`

  Default: `''`

  The URL to use for the documentation JavaScript.


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
