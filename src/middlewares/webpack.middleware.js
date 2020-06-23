import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import openBrowser from 'react-dev-utils/openBrowser';
import { ip } from 'address';
import { PORT } from 'config';
import webpackConfig from '../tools/webpack/webpack.config';

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

  instance.waitUntilValid(() => {
    const host = `http://${ip()}:${PORT}/`;

    console.log(`Server is serving at: ${host}`);

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
