import { resolve } from 'path';
import webpack from 'webpack';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import CompressionWebpackPlugin from 'compression-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ImageminWebpackPlugin from 'imagemin-webpack-plugin';
import OptimizeCSSAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin';
import WebpackBar from 'webpackbar';
import LoadablePlugin from '@loadable/webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import OfflinePlugin from 'offline-plugin';
import { NODE_ENV, isDev, PORT } from '../config';

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
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash:8].css',
      chunkFilename: isDev ? '[id].css' : '[id].[contenthash:8].css',
      ignoreOrder: false,
    }),
    new ImageminWebpackPlugin({
      disable: isDev,
      test: /\.(jpe?g|png|gif|svg)$/i,
      minFileSize: 10240,
      pngquant: { quality: '95-100' },
    }),
    new LoadablePlugin({
      writeToDisk: true,
      filename: 'loadable-stats.json',
    }),
    new WebpackPwaManifest({
      name: 'Express React Boilerplate',
      short_name: 'ERB',
      description:
        '🔥 This is a tool that helps programmers create Express & React projects easily.',
      background_color: '#ffffff',
      theme_color: '#33cccc',
      inject: true,
      ios: true,
      icons: [
        {
          src: resolve(process.cwd(), 'public/assets/favicon-512x512.png'),
          sizes: [72, 96, 128, 144, 192, 384, 512],
        },
        {
          src: resolve(process.cwd(), 'public/assets/favicon-512x512.png'),
          sizes: [120, 152, 167, 180],
          ios: true,
        },
      ],
      filename: 'site.webmanifest',
      start_url: '.',
      display: 'standalone',
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
  } else {
    plugins = [
      ...plugins,
      new CompressionWebpackPlugin({
        test: /\.(js|css)?$/,
        threshold: 10240,
      }),
      new OfflinePlugin({
        autoUpdate: true,
        appShell: '/',
        relativePaths: false,
        updateStrategy: 'all',
        externals: ['/'],
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
    path: resolve(process.cwd(), 'public'),
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDev ? '[id].js' : '[id].[chunkhash:8].js',
    publicPath: '/',
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
          {
            loader: 'postcss',
            options: {
              sourceMap: isDev,
              config: { path: __dirname },
            },
          },
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
          {
            loader: 'postcss',
            options: {
              sourceMap: isDev,
              config: { path: __dirname },
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
