const { resolve } = require('path');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackBar = require('webpackbar');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { NODE_ENV, isDev, PORT } = require('../config');

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
      test: /\.(js|css|html)?$/,
      threshold: 10240,
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash:8].css',
      chunkFilename: isDev ? '[id].css' : '[id].[contenthash:8].css',
      ignoreOrder: false,
    }),
    new ImageminWebpackPlugin({
      disable: !isDev,
      test: /\.(jpe?g|png|gif|svg)$/i,
      minFileSize: 10240,
      pngquant: { quality: '95-100' },
    }),
    new LoadablePlugin({
      writeToDisk: true,
      filename: '../loadable-stats.json',
    }),
  ];

  if (isDev) {
    plugins = [
      ...plugins,
      new WebpackBar(),
      new webpack.HotModuleReplacementPlugin(),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`=====> Listening at http://localhost:${PORT}`],
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
    path: resolve(process.cwd(), 'public/assets'),
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDev ? '[id].js' : '[id].[chunkhash:8].js',
    publicPath: '/assets/',
  },
  plugins: getPlugins(),
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        options: { cacheDirectory: isDev },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
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
          { loader: 'postcss', options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
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
          { loader: 'postcss', options: { sourceMap: isDev } },
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
  optimization: {
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
      new OptimizeCSSAssetsWebpackPlugin({}),
    ],
    splitChunks: {
      chunks: isDev ? 'async' : 'all',
    },
  },
  performance: { hints: false },
};
