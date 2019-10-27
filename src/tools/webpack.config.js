const { join, resolve } = require('path');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');
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
  devtool: isDev ? 'source-map' : 'hidden-source-map',
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
        // options: { cacheDirectory: isDev },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style' },
          {
            loader: 'css',
            options: {
              modules: true,
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          { loader: 'style' },
          {
            loader: 'css',
            options: {
              modules: true,
              sourceMap: isDev,
            },
          },
          {
            loader: 'sass',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|webp|svg)$/i,
        loader: 'url',
        options: { limit: 10240, name: '[name].[hash:8].[ext]' },
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
  optimization: isDev
    ? {}
    : {
        minimizer: [
          new TerserWebpackPlugin({
            cache: true,
            parallel: true,
            sourceMap: false,
            extractComments: false,
            terserOptions: {
              compress: {
                booleans: true,
                drop_console: true,
              },
              warnings: false,
              mangle: true,
            },
          }),
        ],
      },
  performance: { hints: false },
};
