import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../tools/webpack.config';

const compiler = webpack(webpackConfig);

const webpackMiddleware = () => [
  webpackDevMiddleware(compiler, {
    headers: { 'Access-Control-Allow-Origin': '*' },
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    quiet: true, // Turn it on for friendly-errors-webpack-plugin
    noInfo: true,
    stats: 'minimal',
    serverSideRender: true,
  }),
  webpackHotMiddleware(compiler, {
    log: false,
  }),
];

export default webpackMiddleware;
