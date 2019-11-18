const { resolve } = require('path');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { NODE_ENV, isDev } = require('../config');

const getEntries = () => {
  let entries = [resolve(__dirname, '..', 'client/index.js')];

  if (isDev) {
    entries = [
      ...entries,
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
    ];
  }

  return entries;
};

const getPlugins = () => {
  let plugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: isDev,
    }),
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: /\.js(\?.*)?$/i,
    }),
  ];

  if (isDev) {
    plugins = [
      ...plugins,
      new webpack.ProgressPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: ['=====> Listening at http://localhost:8888'],
        },
      }),
    ];
  }

  return plugins;
};

module.exports = {
  mode: NODE_ENV,
  devtool: isDev ? 'source-map' : 'hidden-source-map',
  entry: getEntries(),
  output: {
    path: resolve(__dirname, '..', '..', 'dist/public'),
    filename: 'bundle.js',
  },
  plugins: getPlugins(),
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
              importLoaders: 1,
              modules: {
                localIdentName: '[local]',
                context: resolve(process.cwd(), 'src'),
              },
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
              importLoaders: 2,
              modules: {
                localIdentName: '[local]',
                context: resolve(process.cwd(), 'src'),
              },
              sourceMap: isDev,
            },
          },
          {
            loader: 'sass',
            options: {
              sourceMap: isDev,
              sassOptions: {
                includePaths: [resolve(process.cwd(), 'src/client')],
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'url',
        options: { limit: 10240, name: '[name].[hash:8].[ext]' },
      },
      {
        test: /\.(gif|png|jpe?g|webp)$/,
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
