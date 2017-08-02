# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [3.5.0] - 2017-08-02

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

