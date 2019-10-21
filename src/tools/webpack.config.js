const { join, resolve } = require('path');
const webpack = require('webpack');
const { NODE_ENV, isDev } = require('../config');

const getEntries = () => {
  const entry = [resolve(__dirname, '..', 'client/index.js')];

  if (isDev) {
    entry.push('react-hot-loader/patch', 'webpack-hot-middleware/client');
  }

  return entry;
};

module.exports = {
  mode: NODE_ENV,
  entry: getEntries(),
  output: {
    path: resolve(__dirname, '..', '..', 'dist/public'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(t|j)s?$/,
        exclude: /node_modules/,
        loader: 'babel',
        options: { cacheDirectory: isDev },
      },
    ],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devtool: isDev ? 'source-map' : 'hidden-source-map',
};
