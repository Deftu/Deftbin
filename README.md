<div align="center">

# Deftbin
A simple, open-source code sharing web application made as a more complex alternative to [Pastebin](https://pastebin.com/) and [Hastebin](https://hastebin.com/).

</div>

## Table of Contents

- [Deftbin](#deftbin)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
    - [Basic](#basic)
    - [Docker](#docker)
  - [License](#license)

## Features

- [x] Syntax highlighting
- [x] Upload API
- [x] Compatible with Hastebin API
- [x] Themes
- [ ] Customizable
- [ ] Language indicators

## Installation

Note:
- The `main` branch is the latest stable release.
- The `dev` branch is the latest development version.
- You need Node.js 12 or higher to run Deftbin.

### Basic

1. Clone the repository
2. Install the dependencies in both the `backend` and `frontend` directories using `npm install`.
3. Run the backend using `npm start` in the `backend` directory. (this can be done using your preferred process manager)
4. Build the frontend using `npm run build` in the `frontend` directory.
5. Run the frontend using `node build/index.js` in the `frontend` directory. (this can be done using your preferred process manager)
6. You're done!

### Docker
TODO

## License

Deftbin is licensed under the [LGPL 3.0][lgpl] license.

[lgpl]: https://www.gnu.org/licenses/lgpl-3.0.en.html
