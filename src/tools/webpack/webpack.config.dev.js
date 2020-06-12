import webpack from 'webpack';
import WebpackBar from 'webpackbar';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import { PORT } from '../../config';
import {
  getEntries,
  getOutPut,
  getPlugins,
  getRules,
  getResolver,
} from './helper';

export default {
  mode: 'development',
  devtool: 'source-map',
  entry: getEntries(),
  output: getOutPut(),
  plugins: [
    ...getPlugins(),
    new WebpackBar(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Server is serving at: http://localhost:${PORT}`],
      },
    }),
  ],
  module: {
    rules: getRules(),
  },
  ...getResolver(),
};
