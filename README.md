<h1 align='center'>erb</h1>

<p align='center'>🔥 🔥 🔥 Express react boilerplate 🔥 🔥 🔥</p>

<p align='center'>
  <a href='https://david-dm.org/htdangkhoa/erb'>
    <img src='https://david-dm.org/htdangkhoa/erb/status.svg' alt='dependency status' />
  </a>

  <a href='https://david-dm.org/htdangkhoa/erb?type=dev'>
    <img src='https://david-dm.org/htdangkhoa/erb/dev-status.svg' alt='devDependency status' />
  </a>

  <a href='https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base'>
    <img src='https://img.shields.io/badge/ESLint-airbnb-4B32C3.svg' alt='ESLint: airbnb-base' />
  </a>

  <a href='https://github.com/prettier/prettier'>
    <img src='https://img.shields.io/badge/code_style-prettier-ff69b4.svg' alt='code style: prettier' />
  </a>

  <a href='https://github.com/htdangkhoa/erb/actions'>
    <img src='https://github.com/htdangkhoa/erb/workflows/Github%20Actions/badge.svg?branch=develop' alt='github actions status' />
  </a>
  
  <a href="https://www.codefactor.io/repository/github/htdangkhoa/erb">
		<img src="https://www.codefactor.io/repository/github/htdangkhoa/erb/badge" alt="CodeFactor" />
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
- NoSQL database [(MongoDB)](mongodb.com).
- Client side [(React)](https://reactjs.org).
- Universal routing [(react-router)](https://github.com/ReactTraining/react-router).
- State management [(Redux)](https://redux.js.org).
- Redux debugging tools [(redux-devtools)](https://github.com/reduxjs/redux-devtools).
- Tweak React components in real time [(react-hot-loader)](https://github.com/gaearon/react-hot-loader).
- SEO [(react-helmet)](https://github.com/nfl/react-helmet).
- The recommended Code Splitting library for React [(loadable-components)](https://github.com/gregberge/loadable-components).
- Progressive web app [(offline-plugin)](https://github.com/NekR/offline-plugin).
- Promise based HTTP client for the browser and NodeJS [(axios)](https://github.com/axios/axios).
- Internationalization [(i18next)](https://www.i18next.com/) & [(react-i18next)](https://github.com/i18next/react-i18next).
- A tool for transforming CSS with JavaScript [(PostCSS)](https://postcss.org/).
- PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use. It is recommended by Google and used in Twitter and Alibaba [(autoprefixer)](https://github.com/postcss/autoprefixer).
- Compiles CSS Modules in runtime [(css-modules-require-hook)](https://github.com/css-modules/css-modules-require-hook).
- Allows files required by node that match a given set of extensions to be returned as either a data URI, or a custom filename [(asset-require-hook)](https://github.com/aribouius/asset-require-hook).
- Developing UI components [(Storybook)](https://storybook.js.org/).
- Light & Dark theme.
- Data fetching from server-side.
- Compressing images with imagemin [(imagemin-webpack-plugin)](https://github.com/Klathmon/imagemin-webpack-plugin).
- Unit testing [(Jest)](https://github.com/facebook/jest).
- ES6.
- The optional chaining operator provides a way to simplify accessing values through connected objects when it's possible that a reference or function may be undefined or null [(@babel/plugin-proposal-optional-chaining)](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining).
- Type checker for javascript [(Flow)](https://flow.org/).
- Find and fix problems in your javascript code [(ESlint)](https://eslint.org/).
- Code formatter [(Prettier)](https://prettier.io/).
- Automate your workflow from idea to production [(Github Actions)](https://github.com/features/actions).
- VSCode debugging.

## Requirements

- [Node](https://nodejs.org/en/) >= 10.13.0

## Structure

```
.
├── public                      # Express server static path
│   ├── assets                  # All favicon resources
│   ├── locales                 # All of i18n resources
│   └── robots.txt              # A robots.txt file tells search engine crawlers which pages or files the crawler can or can't request from your site.
├── src                         # App source code
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
│   ├── secure                  # All of security (e.g passport configuration, jsonwebtoken etc.)
│   ├── store                   # Store configuration for both client and server side
│   ├── tools                   # Project related configurations
│   │   ├── jest                # Jest configurations
│   │   ├── webpack             # Webpack configurations
│   │   ├── hooks.js            # Assets require hooks
│   │   └── postcss.config.js   # PostCSS configuration
│   ├── types                   # All of type for flow
│   ├── utils                   # App-wide utils
│   ├── config.js               # Configuration entry point loaded from .env file
│   ├── i18n.js                 # I18next configuration
│   ├── index.js                # App entry point
│   ├── routes.js               # Routes configuration for both client and server side
│   └── server.js               # Express server
│── .babelrc                    # Babel configuration.
│── .env-cmdrc.json             # All of environments configuration.
│── .eslintrc.json              # Eslint configuration.
│── .flowconfig                 # Flow type configuration.
└── .prettierrc.json            # Prettier configuration.
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

> **NOTE**: You can change environment variables in `.env-cmdrc.json` file.

## Scripts

| Script        | Description                                                                           |
| ------------- | ------------------------------------------------------------------------------------- |
| dev           | Start the development server.                                                         |
| dev `--serve` | Start the development server and open browser.                                        |
| start         | Start the production server.                                                          |
| build         | Remove the previous bundled files and bundle it (include client & server) to `dist/`. |
| wp            | Bundle client to `dist/`.                                                             |
| analyze       | Visualize the contents of all your bundles.                                           |
| storybook     | Start the storybook server.                                                           |
| test          | Run testing.                                                                          |
| eslint        | Find problems in your JavaScript code.                                                |

## Enable/Disable offline

- In `src/tools/webpack/webpack.config.prod.js`:

  ```js
  if (isDev) {
    ...
  } else {
    plugins = [
      ...,
      // Comment this plugin if you want to disable offline.
      new OfflinePlugin({
        autoUpdate: true,
        appShell: '/',
        relativePaths: false,
        updateStrategy: 'all',
        externals: ['/'],
      })
    ]
  }
  ```

- At the end of `src/client/index.js`:

  ```js
  if (!__DEV__) {
    require('offline-plugin/runtime').install(); // Comment this line if you want to disable offline.
  }
  ```

## Supported Browsers

By default, the generated project supports all modern browsers. Support for Internet Explorer 9, 10, and 11 requires polyfills. For a set of polyfills to support older browsers, use [react-app-polyfill](https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill).

```bash
$ yarn add react-app-polyfill
# or npm install --save react-app-polyfill
```

You can import the entry point for the minimal version you intend to support to ensure that the minimum language features are present that are required to use in your project. For example, if you import the IE9 entry point, this will include IE10 and IE11 support.

### **Internet Explorer 9**

```js
// This must be the first line in <PROJECT_ROOT>/src/client/app/index.js
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

// ...
```

### **Internet Explorer 11**

```js
// This must be the first line in <PROJECT_ROOT>/src/client/app/index.js
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// ...
```

## CSS variables

By default, the generated project supports all modern browsers. Support for Internet Explorer 9, 10, and 11 requires polyfills. For a set of polyfills to support older browsers, use [css-vars-ponyfill](https://github.com/jhildenbiddle/css-vars-ponyfill).

```js
// In <PROJECT_ROOT>/src/client/vendor/index.js
import cssVars 'css-vars-ponyfill';
// ... your css/scss files.
cssVars({
  silent: !__DEV__,
  ..., // https://jhildenbiddle.github.io/css-vars-ponyfill/#/?id=options
});
```

## Type Checking For Editor

- [Visual Studio Code](https://flow.org/en/docs/editors/vscode/)
- [Atom](https://flow.org/en/docs/editors/atom/)
- [Sublime Text](https://flow.org/en/docs/editors/sublime-text/)
- [Etc.](https://flow.org/en/docs/editors/)

## Contributors

- [htdangkhoa](https://github.com/htdangkhoa)

## Special Thanks

- [(react-cool-starter) - wellyshen](https://github.com/wellyshen/react-cool-starter)

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
