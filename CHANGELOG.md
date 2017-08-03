# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


[3.7.0] - 2017-08-03
------------------------------
### Added
- Added `lint` task which uses eslint to lint all of the JavaScript files in the project. The task is run — along with the `test` task — [_both BEFORE the package is packed and published, and on local npm install_](https://docs.npmjs.com/misc/scripts),


[3.6.0] - 2017-08-02
------------------------------
### Added
- `config.docs.helpers` object added for passing through helper function for handlebars to use


[3.5.0] - 2017-08-02
------------------------------
### Changed
- Updating numerous package dependencies in `package.json` and `yarn.lock`


[3.4.1] - 2017-08-02
------------------------------
### Fixed
- Fixed `isProduction` check for docs base URL.


[3.4.0] - 2017-08-02
------------------------------
### Changed
- Consistent formatting of `gulp-if` statements.

### Fixed
- CSS sourcemap hack removed as [the original issue](https://github.com/scniro/gulp-clean-css/issues/1#issuecomment-231219123) appears to have been fixed.
- CSS sourcemaps are written to separate files.
- JavaScript sourcemaps are now written correctly.
- `watch:docs` task now outputs assets correctly.
