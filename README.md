# gulp-build-fozzie :bear:

[![npm version](https://badge.fury.io/js/%40justeat%2Fgulp-build-fozzie.svg)](https://badge.fury.io/js/%40justeat%2Fgulp-build-fozzie)
[![Build Status](https://travis-ci.org/justeat/gulp-build-fozzie.svg)](https://travis-ci.org/justeat/gulp-build-fozzie)
[![Coverage Status](https://coveralls.io/repos/github/justeat/gulp-build-fozzie/badge.svg)](https://coveralls.io/github/justeat/gulp-build-fozzie)

Gulp build tasks for use across Fozzie modules.


## Contents

- [Setup](#setup)
  - [Optional setup](#optional-setup)
    - [Transpile es2015 code](#transpile-es2015-code)
    - [JavaScript Linting](#javascript-linting)
    - [CSS Linting](#css-linting)
  - [Config and pathBuilder](#config-and-pathbuilder)
    - [Config object](#config-object)
    - [pathBuilder object](#pathbuilder-object)
- [The Gulp Tasks](#the-gulp-tasks)
  - [Development only tasks](#development-only-tasks)
- [Config](#config)
  - [Other config](#other-config)
- [Path Builder](#path-builder)
- [Running the unit tests](running-the-unit-tests)


## Setup

First, add `gulp` and `gulp-build-fozzie` as dependencies

```bash
yarn add gulp @justeat/gulp-build-fozzie
```

Next, inside your `gulpfile.js`, require the build function from `@justeat/gulp-build-fozzie`, then pass `gulp` as the first argument.

```js
const gulp = require('gulp');
const { build } = require('@justeat/gulp-build-fozzie');

build(gulp, /*options*/);
```

You can optionally [pass in options which will override the default config values](#options).

That's it! You can now run any of [the Gulp tasks](#the-gulp-tasks).

### Optional setup

#### Transpile es2015 code

To ensure that the [`scripts:bundle`](#scriptsbundle) task can transpile es2015 code, add the `babel-preset-es2015` preset to the project:

```bash
yarn add babel-preset-es2015
```

Then add a `.babelrc` file, with the `babel-preset-es2015` preset, to the root of your project:

```json
{
    "presets": ["es2015"]
}
```

If you do not add a `.babelrc` file (you may be writing es5 code for example) then the code will be bundled up as is.

#### JavaScript Linting

Add an `.eslintrc` file to the root of your project with the following content to use the JS linting rules we recommend when running the [`scripts:lint`](#scriptslint) task:

```json
{
    "extends": "@justeat/eslint-config-fozzie"
}
```

If you wish to extend or override these rules you can simply add them after the `extends` line in the `.eslintrc` file.

[For more information on how you can configure eslint check out the documentation](http://eslint.org/docs/user-guide/configuring).

#### CSS Linting

To use our recommended fozzie stylelint linting rules add the following into your `package.json` file:

```json
"stylelint": {
    "extends": "@justeat/stylelint-config-fozzie"
}
```

If you wish to extend or override these rules you can simply add them after the `extends` line in the `package.json` file.

[For more information on how you can configure stylelint check out the documentation](https://stylelint.io/user-guide/configuration/).

### Config and pathBuilder

You can also access the `config` and `pathBuilder` objects which are used inside of `gulp-build-fozzie` by requiring them:

```js
const { config, pathBuilder } = require('@justeat/gulp-build-fozzie');
```

These are exposed for convenience, and means that you do not need to manually build paths and maintain a separate config object for any custom tasks in your project. It also reduces duplication and prevents bugs which can arise from specifying incorrect paths.

#### `config` object

This is the config object which is used inside of `gulp-build-fozzie`, if you have passed any options via the `build` method they will be available here.

See the [Options](#options) section below for the details of this object.

#### `pathBuilder` object

The `pathBuilder` object is used inside of `gulp-build-fozzie` in order to build the paths used in the gulp tasks.

See the [Path Builder](#path-builder) section below for details on which paths are available.


## The Gulp Tasks

### `css`

Runs the following tasks

- #### `scss:lint`

  Lint all SCSS files in the source directory — this runs before the [`css:bundle`](#cssbundle) task.

- #### `css:lint`

  Lint all CSS files in the dist directory — this runs after the [`css:bundle`](#cssbundle) task.

- #### `clean:css`

  Removes any CSS already in the dist directory.

- #### `clean:assets`

  Removes any imported assets in the imported assets directory.

- #### `copy:assets`

  Copies assets from packages to the imported assets directory.

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

- #### `scripts:test:coverage`

  Runs the JS unit tests and display a coverage report once complete.

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

- #### `clean:images`

  Removes any images already in the dist directory.

- #### `images:optimise`

  Optimises all images found in the source directory then copies them to the dist directory.

- #### `images:svg-sprite`

Generate an SVG sprite and copy into the dist directory

### `service-worker`

Runs the following tasks

- #### `service-worker:locate`

Discovers scripts in the service worker directory.

- #### `service-worker:copy`

Copies the worker's internal scripts to the dist directory.

- #### `service-worker:write`

Generates a service worker to pre-cache the assets defined in the config.

### `copy:js`, `copy:css`, `copy:img` & `copy:fonts`

Each of these tasks copies the specified set of assets from the `src` to the `dist` asset folders.

See the [config section](#js-css-img--fonts) for details on how to configure these tasks.

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

Builds a fresh copy of any documentation found in the [`config.docs.rootDir`](#rootdir) directory using Assemble, then watches for any file changes and reloads the web page when changes are detected in the [`config.docs.distDir`](#distdir) directory.

- #### `docs:deploy`

Builds the documentation and then pushes the dist directory to the gh-pages branch.

- #### `docs:release`

Pushes the documentation dist directory to the `gh-pages` branch.

- #### `clean:docs`

Removes document files already in the docs dist directory.

- #### `browser-sync`

Watches for changes to files and reloads a local website instance.

- #### `browser-sync:docs`

Generates the documentation files then opens the docs in a local server.

- #### `assemble`

Generates the documentation files.


## Config

Here is the outline of the configuration options, descriptions of each are below.

```js
{
    webRootDir,
    assetSrcDir,
    assetDistDir,
    css: {
        scssDir,
        cssDir,
        lintPaths,
        sourcemaps
    },
    js: {
        files: {
            main: {
                srcPath,
                distFile,
                applyRevision
            },
            …
        ],
        jsDir,
        lintPaths,
    },
    img: {
        imgDir,
        svgSpriteFilename
    },
    importedAssets: {
        importedAssetsDir,
        importedAssetsSrcGlob
    },
    sw: {
        isEnabled,
        swDir,
        outputFile,
        staticFileGlobs,
        dynamicFileRegex,
        dynamicFileStrategy,
        importScripts,
        cacheId
    },
    copy: {
        js,
        css,
        img,
        fonts
    },
    docs: {
        rootDir,
        srcDir,
        distDir,
        assetDir,
        templDir,
        dataDir,
        outputAssets,
        remoteBase,
        helpers
    },
    fonts: {
      fontsDir
    },
    browserSync: {
        files,
        proxy,
        reloadDebounce
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


### `webRootDir`

Type: `string`

Default: `'.'`

The root directory of your website.

### `assetSrcDir`

Type: `string`

Default: `'src'`

Root source directory for your assets.

### `assetDistDir`

Type: `string`

Default: `'dist'`

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

- #### `lintPaths`

  Type: `array`

  Default: `['']`

  Allows additional paths to be included or excluded from the linting task.

  By default, the task will lint all `.scss` files within the `scssDir` directory.

- #### `sourcemaps`

  Type: `boolean`

  Default: [`isDev`](#other-options)

  Turns sourcemaps on or off.


### `js`

#### `files`

Type: `Object`

Default:

```
{
    main {
        srcPath: 'index.js',
        distFile: 'script.js',
        applyRevision: true
    }
}
```

An Object, that takes one or more child objects each describing a JavaScript bundle entry point and destination.  Each of these objects can have the following properties:

- ##### `srcPath`

  Type: `string`

  Default: `'index.js'`

  The file path to a bundle entry point in your JavaScript.

- ##### `distFile`

  Type: `string`

  Default: `'script.js'`

 The filename for the JavaScript bundle once compiled.

- ##### `applyRevision`

  Type: `boolean`

  Default: true

  Will add a content hash to the filename.


- #### `jsDir`

  Type: `string`

  Default: `'js'`

  Name of the directory where all of your JavaScript files are kept.

  Compiled JavaScript files will be placed inside a directory with the same name.

- #### `lintPaths`

  Type: `array`

  Default: `['']`

  Allows additional paths to be included or excluded from the JS linting task.

  By default, the task will lint all files within the `jsDir` directory.



### `img`

- #### `imgDir`

  Type: `string`

  Default: `'img'`

  Name of the directory where your image files are kept.

  Processed image files will be placed inside a directory with the same name.

- #### `svgSpriteFilename`

  Type: `string`

  Default: `'sprite.svg'`

  Filename of the SVG sprite which is generated from any SVG assets found in the image directory.


### `importedAssets`

- #### `importedAssetsDir`

  Type: `string`

  Default: `'imported-assets'`

  Name of the directory where assets from node_modules will be copied to.

- #### `importedAssetsSrcGlob`

  Type: `string`

  Default: `'node_modules/@justeat/*/'`

  Glob of packages containing assets to be copied to `importedAssetsDir`.


### `sw`

- #### `isEnabled`

  Type: `boolean`

  Default: `false`

  Determines whether the service worker is generated or not.

- #### `swDir`

  Type: `string`

  Default: `'sw'`

  Name of the directory where your service worker's custom internal scripts are kept in.

  Scripts here will be placed inside a directory with the same name.

- #### `outputFile`

  Type: `string`

  Default: `'service-worker.js'`

  The name of the generated service worker file, to be placed in the root of your application.

- #### `staticFileGlobs`

  Type: `array`

  Default: `[]`

  The static files in your application to be cached by the service worker.

- #### `dynamicFileRegex`

  Type: `array`

  Default: `[]`

  An array of regex to match the dynamic content or API calls to cache e.g. `[/^https:\/\/example\.com\/api/, /^https:\/\/fonts.googleapis.com\/css/]`.

- #### `dynamicFileStrategy`

  Type: `string`

  Default: `cacheFirst`

  The cache strategy to be used for content matched by `dynamicFileRegex` - these correspond to the [sw-toolbox handlers](https://googlechrome.github.io/sw-toolbox/api.html#handlers).

- #### `importScripts`

  Type: `array`

  Default: `[]`

  Any additional internal scripts to include, aside from those in `swDir`.

- #### `cacheId`

  Type: `string`

  Default: `''`

  An optional string used to differentiate caches on the same origin during local development.

### `copy`

- #### `js`, `css` `img` & `fonts`

  Type: `Object`

  Default: `{}`

  `copy.js`, `copy.css`, `copy.img` and `copy.fonts` each take an object list of assets in the format:

  ```js
    copy:
      js: {
        prism: {
            path: '/libs/**/*',
            dest: '/libs',
            revision: false
        }
      }
    }
  ```

  In which:
  - `path` is a string specifying the path within the relevant asset `src` folder of the asset to be copied.
  - `dest` is a string specifying that destination folder for the asset to be copied to, within the relevant asset `dist` folder.
  - `revision` is a boolean such that if it is true, the asset will be [revision hashed](https://www.npmjs.com/package/gulp-rev) when copied to it’s destination.

  `path` and `dest` must always be defined for each asset you wish to copy.

  The object key (which in the above example is `prism`) of each asset is simply for your own use to identify each asset in your config.


### `docs`

- #### `rootDir`

  Type: `string`

  Default: `'./docs'`

  Root directory where your documentation files reside.

  By default your source files will be searched for in `docs/src`, and the generated content will be output to `docs/dist`.

- #### `srcDir`

  Type: `string`

  Default: `'src'`

  The source directory for your documentation template files.

  By default the documentation task will use the path `docs/src` – with the `src` part of this path controlled by this config variable.

- #### `distDir`

  Type: `string`

  Default: `'dist'`

  The directory your documentation will be compiled to.

  By default the documentation task will use `docs/dist` – with the `dist` part of this path controlled by this config variable.

- #### `assetDir`

  Type: `string`

  Default: `'assets/'`

  The directory your generated assets will be placed inside the documentation directory.

  By default the documentation task will use `docs/dist/assets/` – with the `assets/` part of this path controlled by this config variable.

- #### `templDir`

  Type: `string`

  Default: `'templates'`

  The name of the directory where your documentation template files are kept.

- #### `dataDir`

  Type: `string`

  Default: `'data'`

  The name of the directory where your documentation data files are kept.

- #### `outputAssets`

  Type: `boolean`

  Default: `false`

  Indicates whether or not the JavaScript, CSS and image files should be placed into the `docs/dist/assets/` directory.

- #### `remoteBase`

  Type: `string`

  Default: `''`

  Applies a base path to asset URLs when publishing documentation to Github pages.  By default this is set to be an empty string.

- #### `helpers`

  Type: `object`

  Default: `{ }`

  Can pass in an object set of functions, which will be exposed in handlebars as helper functions in the documentation tasks when called using their object key.

  For example:

  ```js
  {
    'toLowercase': (input) => { return input.toLowerCase(); }
  }
  ```

  Will expose the helper `toLowercase` so that using `{{toLowercase name}}` within a handlebars template will convert the handlebars string `name` to lowercase.

### `fonts`

- #### `fontsDir`

  Type: `string`

  Default: `'fonts'`

  Name of the directory where your font files are kept.

### `browserSync`

- #### `files`

  Type: `array`

  Default: `[]`

  List of paths to watch for changes. Accepts globs.

- #### `proxy`

  Type: `string`

  Default: `''`

  URL of local website instance.

- #### `reloadDebounce`

  Type: `number`

  Default: `1000`

  Wait for a specified window of event-silence before sending any reload events.

### `misc`

- #### `showFileSize`

  Type: `boolean`

  Default: `true`

  Should file sizes be displayed when a task is run?

- #### `showFiles`

  Type: `boolean`

  Default: `true`

  Should file names be displayed when a task is run?


### `gulp`

- #### `changeEvent`

  Type: `function`

  Event which fires when a file is modified.

- #### `onError`

  Type: `function`

  Event which fires when an error occurs.


### Other config

The following options are also present in the config but cannot be overridden.

- #### `isProduction`

  Type: `boolean`

  Set to `true` when the `--prod` flag is passed.

- #### `isDev`

  Type: `boolean`

  Set to the opposite value of `isProduction`


## Path Builder

You can access the `pathBuilder` paths like this.

```js
const { pathBuilder } = require('@justeat/gulp-build-fozzie');

gulp.task('scss', () => gulp.src(`${pathBuilder.scssSrcDir}/**`)

…
```

These are the paths which the `pathBuilder` object provides.

### CSS

- #### `scssSrcDir`

  Default: `'src/scss'`


- #### `cssDistDir`

  Default: `'dist/css'`


- #### `jsSrcDir`

  Default: `'src/js'`


- #### `jsDistDir`

  Default: `'dist/js'`


- #### `imgSrcDir`

  Default: `'src/img'`


- #### `imgDistDir`

  Default: `'dist/img'`


- #### `importedAssetsDistDir`

  Default: `'dist/imported-assets'`


- #### `swOutputPath`

  Default: `'.'`


- #### `swSrcDir`

  Default: `'src/sw'`


- #### `swDistDir`

  Default: `'dist/sw'`


- #### `docsSrcDir`

  Default: `'./docs/src'`


- #### `docsDistDir`

  Default: `'./docs/dist'`


- #### `docsTemplateDir`

  Default: `'./docs/src/templates'`


- #### `docsDataDir`

  Default: `'./docs/src/data'`


- #### `docsAssetsDistDir`

  Default: `'./docs/dist/assets/'`


- #### `docsCssDistDir`

  Default: `'./docs/dist/assets/css'`


- #### `docsJsDistDir`

  Default: `'./docs/dist/assets/js'`


- #### `docsImgDistDir`

  Default: `'./docs/dist/assets/img'`


- #### `fontsSrcDir`

  Default: `'src/fonts'`


- #### `fontsDistDir`

  Default: `'dist/fonts'`


## Running the unit tests

To run the unit tests for the project run the `yarn test` script. To see the test coverage run the `test:cover` script.
