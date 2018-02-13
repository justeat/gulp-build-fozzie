# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v7.12.0
------------------------------
*February 13, 2018*

### Added
- `gulp-file` to dependencies

### Changed
- Add `logger-file.js` to tasks - this will add the server-side file required for the errorLogger to be inserted into the filesystem
- Add logger paths to config
- Add logger paths to pathbuilder
- Updated unit tests
- Added `.idea` to `gitignore`

v7.11.0
------------------------------
*February 7, 2018*

### Changed
- Javascript task to handle versioning if `usePackageVersion` is set to `true`.


v7.10.0
------------------------------
*February 7, 2018*

### Changed
- Changed `imagemin` config to maintain svg `viewBox`.

v7.9.0
------------------------------
*February 2, 2018*

### Added
- `stripDebug` option to `config.js` to allow the inclusion of console statements in production builds.
- `--noStripDebug` command line flag.

### Changed
- Jest rollback from v22.1.4 to v21.2.1.

v7.8.0
------------------------------
*February 1, 2018*

### Added
- Added the ability to pass environment variables into the SCSS compilation
- Added $isDev, $isProd, $env and $server variables that are now available in Sass
- :bear: added to fozzie log notification

### Changed
- Minor package updates

v7.7.0
------------------------------
*January 30, 2018*

### Added
- Run npm scripts concurrently.

### Changed
- Updated eslint module versions.
- Updated jest version.
- Using `Object.assign` in jest task as object spread is only supported in node v8.6.0 and up.

### Remove
- Removed eslint jest module as Jest is already specified within `eslint-config-fozzie`.


v7.6.0
------------------------------
*January 30, 2018*

### Changed
- Updated `f-copy-assets` module.


v7.5.0
------------------------------
*January 30, 2018*

### Fixed
- Fix the way that arguments are combined when calling `jestTestRun`.


v7.4.0
------------------------------
*January 30, 2018*

### Changed
- Set `passWithNoTests` argument to `true` for all Jest test runs to prevent error when there are no tests in the project.


v7.3.0
------------------------------
*January 30, 2018*

### Changed
- Set `bail` argument to `true` only when run in production.


v7.2.0
------------------------------
*January 23, 2018*

### Changed
- Added `usePackageVersion` to config file to handle the css versioning, default value is set to `false`.
- Added `packageVersion` to config file which returns the current scoped package version.
- Updated `config.test` tests to cover the above changes.


v7.1.0
------------------------------
*January 18, 2018*

### Changed
- Set `bail` argument to `true` for all Jest test runs so that it returns the correct exit code when a test run fails.


v7.0.0
------------------------------
*January 17, 2018*

### Changed
- Whole host of packages updated.  Main ones to know about are:
  - [stylelint-config-fozzie](https://github.com/justeat/stylelint-config-fozzie) updated to v2.0.0
  - Babelify and Browserify major version bumps to v8 and v15 respectively
- Updated the Danger config in Travis, as the call is now `yarn danger ci` to run the checks

v6.5.0
------------------------------
*December 4, 2017*

### Changed
- Output unhashed, minified JS file

v6.4.0
------------------------------
*December 4, 2017*

### Changed
- Move `applyRevision` variable out of the JS-only config so that it can be used for applying revision identifiers to the CSS files as well.
- Updated readme to reflect new config structure.
- Updated unit tests.


v6.3.0
------------------------------
*October 18, 2017*

### Changed
- Updated dependencies.
- Updated `jest.runCLI` to match new signature.
- Moved duplicate jest calls out into a single function.
- Updated code formatting in `css:bundle` task.


v6.2.1
------------------------------
*October 04, 2017*

### Changed
- Changed the log message to display the consuming package name and gulp-build-fozzie version.


v6.2.0
------------------------------
*October 03, 2017*

### Changed
- Updated the CSS task so that it produces map files for both the concatenated and the minified files produced


v6.1.1
------------------------------
*September 22, 2017*

### Changed
- Commit message for docs:deploy updated so that it doesn't clash with commit checks


v6.1.0
------------------------------
*September 20, 2017*

### Changed
- Run `cleanupIDs` plugin to ensure all IDs are unique inside SVG sprite.


v6.0.0
------------------------------
*September 01, 2017*

### Changed
- `copy:assets` task has moved from the `css` task to the `images` task.
- Changed the order in which the `images` tasks run — images are now copied, optimised, and then the SVG sprite is created.
- SVG sprite is created from assets found in the `dist` directory rather than `src`.


v5.5.3
------------------------------
*August 25, 2017*

### Changed
- Lint task plumber only used in dev (so that it breaks the travis build if it errors)


v5.5.2
------------------------------
*August 25, 2017*

### Added
- Better error handling for JS bundling so that errors in the browserify build don’t break the stream


v5.5.1
------------------------------
*August 24, 2017*

### Changed
- Fixed a bug in `copy:assets` where the task callback was called too many times.


v5.5.0
------------------------------
*August 24, 2017*

### Added
- Added `config.importedAssets.verbose` option.
- Added unit tests for `config.importedAssets.verbose` option.

### Changed
- `copy:assets` task uses the `f-copy-assets` module rather than `npm-assets`
- The Readme `config.importedAssets` section was updated.


v5.4.0
------------------------------
*August 22, 2017*

### Changed
- `copy:assets` task copies to `config.assetDistDir` instead of the `pathBuilder.importedAssetsDistDir`.
- `css:bundle` task loads the `config.DistDir` into postcss rather than `importedAssetsDistDir`
- The Readme `copy:assets` and `config.importedAssets` sections were updated.

### Removed
- Removed `config.importedAssets.importedAssetsDir` .
- Removed `pathBuilder.importedAssetsDistDir`.
- Removed unit tests for above properties.
- Removed `clean:assets` task.
- The above properties and task were removed from the Readme.


v5.3.1
------------------------------
*August 21, 2017*

### Changed
- License update


v5.3.0
------------------------------
*August 18, 2017*

### Added
- Added the `scripts:test:coverage` task.


v5.2.0
------------------------------
*August 18, 2017*

### Added
- Added `docs:deploy` and `docs:release` tasks.
- Added documentation for the new `docs` tasks.

### Removed
- Removed `debug` from assemble task.
- Removed `copy:fonts` task from `docs` as it's called later in the `default` task.

### Changed
- Renamed the `Options` section to `Config` in the README.


v5.1.0
------------------------------
*August 16, 2017*

### Added
- Added `browser-sync` task along with config settings and tests.
- Added `docsAssetsDistDir` path to `pathBuilder`.


v5.0.0
------------------------------
*August 16, 2017*

### Changed
- JavaScript task can now handle multiple files to be bundled via Browserify/Babel.  Check the README for updated config changes.
- Updatd `copy` task error handling


v4.5.0
------------------------------
*August 15, 2017*

### Changed
- `test:cover` task simplified.
- `docs` task now copies fonts correctly.
- `default` task refactored — now using the spread operator to conditionally add the `service-worker` task to `runSequence`.


v4.4.0
------------------------------
*August 11, 2017*

### Changed
- Changed `config.importedAssets.importedAssetsSrcGlob` default option.
- `copy:assets` task no longer recursively checks dependencies of dependencies.
- Fixed a bug with the callback in `copy:assets`
- Dangerfile updated – result json couldn’t be accessed, so had to pass in `result` variable

### Removed
- Removed `watch:assets` task.


v4.3.0
------------------------------
*August 10, 2017*

### Added
- Added `config.importedAssets` object.
- Added imported assets paths to pathBuilder.
- Added `copy:assets` task.
- Added `clean:assets` task.
- Added `watch:assets` task.
- Unit tests added for new config and pathBuilder properties.
- The Readme *Imported Assets config* section was added.
- The Readme *Imported Assets pathBuilder* section was added.
- The Readme was updated to document the new tasks added.

### Changed
- Updated clean task comments.
- The `css:bundle` task loads the `importedAssetsDistDir` into postcss, so that Fozzie modules can access assets copied there.


v4.2.0
------------------------------
*August 08, 2017*

### Added
- Added `config.fonts` object.
- Added fonts paths to pathBuilder.
- Added `copy.fonts` object.
- Added `copy:fonts` task.
- Unit tests added for new config and pathBuilder properties.
- Unit tests added to test all `config.copy` properties are updated correctly.
- The Readme *Fonts config* section was added.
- The Readme *Fonts pathBuilder* section was added.

### Changed
- Updated copy task comments.
- If no `dest` property is defined in the `copy` config then it will default to an empty string.
- Improved logging for `copy` tasks.
- The Readme `config.copy` and `copy` tasks sections were updated to include the new font additions.
- Updated `copy` task comments.


v4.1.1
------------------------------
*August 08, 2017*

### Fixed
- Fixed lint errors in `danger.js`.


v4.1.0
------------------------------
*August 07, 2017*

### Added
- Danger.js has been added to do basic PR checks.  This will leave comments on the PR when the `changelog` hasn’t been updated, the version needs incrementing or if it thinks the `README` might need an update.


v4.0.0
------------------------------
*August 04, 2017*

### Changed
- The return value is now an object containing the `build`, `config`, and `pathBuilder` objects instead of the `build` function.
- Service worker path no longer contains the service worker filename.

### Added
- The Readme *Setup* section was updated to reflect the changes to the default return value.
- The Readme *Path Builder* section was added.


v3.8.0
------------------------------
*August 03, 2017*

### Added
- Added `copy:js`, `copy:css` and `copy:img` tasks to copy over separate files without bundling.  See README for more information.


v3.7.0
------------------------------
*August 03, 2017*

### Added
- Added `lint` task which uses eslint to lint all of the JavaScript files in the project. The task is run — along with the `test` task — [_both BEFORE the package is packed and published, and on local npm install_](https://docs.npmjs.com/misc/scripts).

### Changed
- The `for...in` loop in `assemble.js` was throwing eslint errors, in order to fix this we converted the loop to use `Object.keys` and `forEach` instead.


v3.6.0
------------------------------
*August 02, 2017*

### Added
- `config.docs.helpers` object added for passing through helper function for handlebars to use


v3.5.0
------------------------------
*August 02, 2017*

### Changed
- Updating numerous package dependencies in `package.json` and `yarn.lock`


v3.4.1
------------------------------
*August 02, 2017*

### Fixed
- Fixed `isProduction` check for docs base URL.


v3.4.0
------------------------------
*August 02, 2017*

### Changed
- Consistent formatting of `gulp-if` statements.

### Fixed
- CSS sourcemap hack removed as [the original issue](https://github.com/scniro/gulp-clean-css/issues/1#issuecomment-231219123) appears to have been fixed.
- CSS sourcemaps are written to separate files.
- JavaScript sourcemaps are now written correctly.
- `watch:docs` task now outputs assets correctly.
