# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.3.0] - 2024-07-10

### Added

- Option to choose a new default port for Express.
- Option to enable usage of CORS library for Express.
- When using Express, create /routes folder with example API route.

### Changed

- Updated inquirer library.

### Fixed

- Add nodemon to `npm run dev` script.
- Removed "https" protocol from console.log statement on Express app start.

## [1.2.0] - 2024-07-10

### Added

- Option to enable reloading of project using `nodemon`.

### Changed

- N/A

### Fixed

- Updated express setting to handle body-parser deprecation warning.

## [1.1.0] - 2022-09-17

### Added

- Added Helmet to any project using Express

### Changed

- Updated entry file for Express projects to utilize the built in body-parser logic for Express.

### Fixed

- N/A
