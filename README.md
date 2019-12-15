<h1 align='center'>erb</h1>

<p align='center'>🔥 🔥 🔥 Express react boilerplate 🔥 🔥 🔥</p>

<p align='center'>
  <a href='https://david-dm.org/htdangkhoa/erb'>
    <img src='https://david-dm.org/htdangkhoa/erb/status.svg' alt='dependency status' />
  </a>

  <a href='https://david-dm.org/htdangkhoa/erb?type=dev'>
    <img src='https://david-dm.org/htdangkhoa/erb/dev-status.svg' alt='devDependency status' />
  </a>

  <a href='https://github.com/prettier/prettier'>
    <img src='https://img.shields.io/badge/code_style-prettier-ff69b4.svg' alt='code style: prettier' />
  </a>

  <a href='https://github.com/htdangkhoa/erb/actions'>
    <img src='https://github.com/htdangkhoa/erb/workflows/Github%20Actions/badge.svg?branch=develop' alt='github actions status' />
  </a>

  <a href='https://raw.githubusercontent.com/htdangkhoa/erb/master/LICENSE'>
    <img src='https://img.shields.io/badge/license-MIT-blue.svg' alt='MIT licensed' />
  </a>
</p>

<p align='center'>
  <a href='https://www.npmjs.com/package/express-react-boilerplate'>
    <img src='https://nodei.co/npm/express-react-boilerplate.png' alt='NPM' />
  </a>
</p>

## Features
- Server side [(Express)](https://expressjs.com).
- Client side [(React)](https://reactjs.org).
- Universal routing [(react-router)](https://github.com/ReactTraining/react-router).
- State management [(Redux)](https://redux.js.org).
- Redux debugging tools [(redux-devtools)](https://github.com/reduxjs/redux-devtools).
- Tweak React components in real time [(react-hot-loader)](https://github.com/gaearon/react-hot-loader).
- SEO [(react-helmet)](https://github.com/nfl/react-helmet).
- Promise based HTTP client for the browser and NodeJS [(axios)](https://github.com/axios/axios).
- Internationalization [(i18next)](https://www.i18next.com/) & [(react-i18next)](https://github.com/i18next/react-i18next).
- Compiles CSS Modules in runtime [(css-modules-require-hook)](https://github.com/css-modules/css-modules-require-hook).
- Allows files required by node that match a given set of extensions to be returned as either a data URI, or a custom filename [(asset-require-hook)](https://github.com/aribouius/asset-require-hook).
- Developing UI components [(Storybook)](https://storybook.js.org/).
- Light & Dark theme.
- Data fetching from server-side.
- Compressing images with imagemin [(imagemin-webpack-plugin)](https://github.com/Klathmon/imagemin-webpack-plugin).
- Unit testing [(Jest)](https://github.com/facebook/jest).
- ES6.
- Type checker for javascript [(Flow)](https://flow.org/).
- Find and fix problems in your javaScript code [(ESlint)](https://eslint.org/).
- Code formatter [(Prettier)](https://prettier.io/).
- Automate your workflow from idea to production [(Github Actions)](https://github.com/features/actions).
- VSCode debugging.

## Requirements
- [Node](https://nodejs.org/en/) >= 10.13.0

## Structure
```
.
├── src
│   ├── api                     # All of restful API
│   ├── client                  # Client scope
│   │   ├── app                 # App root component
│   │   ├── assets              # Assets (e.g. images, fonts etc.)
│   │   ├── components          # Reusable components
│   │   ├── pages               # Page components
│   │   ├── stories             # UI components with Storybook
│   │   ├── themes              # App-wide style
│   │   ├── vendor              # 3rd libraries for client
│   │   └── index.js            # App bootstrap and rendering (webpack entry)
│   ├── middlewares             # All of express middleware
│   ├── model                   # Data transfer object
│   ├── mongo                   # MongoDB configuration
│   ├── public                  # Express server static path
│   │   ├── locales             # All of i18n resources
│   │   └── favicon.ico         # Favicon is placed in the same path with the main HTML page
│   ├── secure                  # All of security (e.g passport configuration, jsonwebtoken etc.)
│   ├── store                   # Store configuration for both client and server side
│   ├── tools                   # Project related configurations
│   │   ├── jest                # Jest configurations
│   │   ├── hooks.js            # Assets require hooks
│   │   └── webpack.config.js   # Webpack configuration
│   ├── types                   # All of type for flow
│   ├── utils                   # App-wide utils
│   ├── config.js               # Configuration entry point loaded from .env file
│   ├── i18n.js                 # I18next configuration
│   ├── index.js                # App entry point
│   ├── routes.js               # Routes configuration for both client and server side
│   └── server.js               # Express server
├── .env.development            # All of variables for development environment
└── .env.production             # All of variables for production environment
```

## Installation
```bash
$ yarn global add express-react-boilerplate
# or (sudo) npm install -g express-react-boilerplate
```

## Getting Started     
**1. Usage:**
```bash
$ erb-gen --help

  Usage: erb-gen [options]

  Options:
    -v, --version      output the version number
    -d, --dir <type>   project's directory. (default: ".")
    -n, --name <type>  project's name. (default: "express-react-boilerplate")
    -h, --help         output usage information

  Examples:
    $ erb-gen
    $ erb-gen --name example
```

**2. Install dependencies:**
```bash
$ cd <your_project>

$ yarn
# or npm install
```

**3. Run it:**
```bash
$ yarn dev
# or npm run dev
```

## Build
```bash
$ yarn build
# or npm run build
```

---

> **NOTE**: You can change environment variables in `.env.development` for Development mode or `.env.production` for Production mode.

## Scripts
| Script    | Description                                                                           |
| --------- | ------------------------------------------------------------------------------------- |
| dev       | Start the development server.                                                         |
| start     | Start the production server.                                                          |
| build     | Remove the previous bundled files and bundle it (include client & server) to `dist/`. |
| wp        | Bundle client to `dist/`.                                                             |
| analyze   | Visualize the contents of all your bundles.                                           |
| storybook | Start the storybook server.                                                           |
| test      | Run testing.                                                                          |

## Contributors
- [htdangkhoa](https://github.com/htdangkhoa)

## License
    MIT License

    Copyright (c) 2019 Huỳnh Trần Đăng Khoa

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
