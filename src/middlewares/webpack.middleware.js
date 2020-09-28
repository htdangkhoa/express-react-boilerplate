import os from 'os';
import last from 'lodash/last';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import openBrowser from 'react-dev-utils/openBrowser';
import { PORT } from 'config';
import webpackConfig from '../tools/webpack/webpack.config';
import packageJson from '../../package.json';

const compiler = webpack(webpackConfig);

const webpackMiddleware = () => {
  const instance = webpackDevMiddleware(compiler, {
    headers: { 'Access-Control-Allow-Origin': '*' },
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    quiet: true, // Turn it on for friendly-errors-webpack-plugin
    noInfo: true,
    stats: 'minimal',
    serverSideRender: true,
  });

  instance.waitUntilValid(async () => {
    console.clear();

    const MAX = 60;

    const renderValue = (v = '', c = ' ') =>
      `│ ${v}${''.padEnd(MAX - v.length - 2, c)} │`;

    const { en0 } = os.networkInterfaces();

    const lastEn0 = last(en0.filter(({ family }) => family === 'IPv4'));

    const host = !lastEn0 ? '0.0.0.0' : `http://${lastEn0.address}:${PORT}`;

    console.log(`┌${''.padEnd(MAX, '─')}┐`);

    console.log(renderValue(`PID:         ${process.pid}`));
    console.log(renderValue(`Node.js:     ${process.version}`));
    console.log(renderValue(`OS:          ${process.platform}`));
    console.log(renderValue());

    console.log(renderValue(`Application: ${packageJson.name}`));
    console.log(renderValue(`Version:     ${packageJson.version}`));
    console.log(renderValue(`Host:        ${host}`));
    console.log(renderValue(`Profile:     ${process.env.NODE_ENV}`));
    console.log(renderValue());

    console.log(renderValue(`👉 Enter 'r' to restart application.`));

    console.log(`└${''.padEnd(MAX, '─')}┘`);

    if (process.argv.includes('--serve')) {
      openBrowser(host);
    }
  });

  return [
    instance,
    webpackHotMiddleware(compiler, {
      log: false,
    }),
  ];
};

export default webpackMiddleware;
