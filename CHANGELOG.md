# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v4.4.0
------------------------------
*August 11, 2017*

### Changed
- Changed `config.importedAssets.importedAssetsSrcGlob` default option.
- `copy:assets` task no longer recursively checks dependencies of dependencies.
- Fixed a bug with the callback in `copy:assets`

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
