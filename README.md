<h1 align='center'>erb</h1>

<p align='center'>:fire: :fire: :fire: Express react boilerplate :fire: :fire: :fire:</p>

<p align='center'>
  <a href='https://david-dm.org/htdangkhoa/erb'>
    <img src='https://david-dm.org/htdangkhoa/erb/status.svg' alt='dependency status' />
  </a>

  <a href='https://david-dm.org/htdangkhoa/erb?type=dev'>
    <img src='https://david-dm.org/htdangkhoa/erb/dev-status.svg' alt='devDependency status' />
  </a>

  <a href='https://github.com/prettier/prettier'>
    <img src='https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square' alt='code style: prettier' />
  </a>

  <a href='https://github.com/htdangkhoa/erb/actions'>
    <img src='https://github.com/htdangkhoa/erb/workflows/Github%20Actions/badge.svg?branch=develop' alt='github actions status' />
  </a>

  <a href='https://raw.githubusercontent.com/htdangkhoa/erb/master/LICENSE'>
    <img src='https://img.shields.io/badge/license-MIT-blue.svg' alt='MIT licensed' />
  </a>
</p>

## Features
- Server side [(Express)](https://expressjs.com).
- Client side [(React)](https://reactjs.org).
- Universal routing [(react-router)](https://github.com/ReactTraining/react-router).
- State management [(Redux)](https://redux.js.org).
- Easy debuging with [(redux-devtools)](https://github.com/reduxjs/redux-devtools).
- Tweak React components in real time [(react-hot-loader)](https://github.com/gaearon/react-hot-loader).
- SEO [(react-helmet)](https://github.com/nfl/react-helmet).
- Promise based HTTP client for the browser and NodeJS [(axios)](https://github.com/axios/axios).
- Internationalization [(i18next)](https://www.i18next.com/) & [(react-i18next)](https://github.com/i18next/react-i18next).
- Light & Dark theme.
- Data fetching from server-side.
- ES6.
- Flowtype.
- ESlint.
- Prettier.

## Requirements
- [Node](https://nodejs.org/en/) >= 10.13.0

## Getting Started
**1. Clone repo:**
```bash
$ git clone https://github.com/htdangkhoa/erb.git
$ cd erb
```

**2. Install dependencies:**
```bash
$ yarn # or npm install
```

**3. Run it:**
```bash
$ yarn dev # or npm run dev
```

## Build
```bash
$ yarn build # or npm run build
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
