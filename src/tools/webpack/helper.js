import { resolve } from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { isDev } from '../../config';

const cwd = process.cwd();

export const getEntries = () => {
  let entries = [resolve(cwd, 'src/client/index.js')];

  if (isDev) {
    entries = ['webpack-hot-middleware/client?reload=true', ...entries];
  }

  return entries;
};

export const getOutPut = () => ({
  path: resolve(cwd, 'public'),
  filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
  chunkFilename: isDev ? '[id].js' : '[id].[chunkhash:8].js',
  publicPath: '/',
});

export const getPlugins = () => {
  const plugins = [
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
    new LoadablePlugin({
      writeToDisk: true,
      filename: 'loadable-stats.json',
    }),
  ];

  return plugins;
};

export const getRules = () => {
  const rules = [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      options: { cacheDirectory: isDev },
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
          },
        },
        {
          loader: 'css',
          options: {
            importLoaders: 1,
            modules: {
              localIdentName: '[local]',
              localIdentContext: resolve(cwd, 'src/client'),
            },
            sourceMap: isDev,
          },
        },
        {
          loader: 'postcss',
          options: {
            sourceMap: isDev,
            postcssOptions: {
              plugins: [
                autoprefixer({ grid: true }),
                cssnano({ preset: 'advanced' }),
              ],
            },
          },
        },
        {
          loader: 'sass',
          options: {
            sourceMap: isDev,
            sassOptions: {
              includePaths: [resolve(cwd, 'src/client')],
              javascriptEnabled: true,
            },
          },
        },
      ],
    },
    {
      test: /\.(woff2?|ttf|eot|svg)$/,
      loader: 'file',
      options: { limit: 10240, name: '[name].[hash:8].[ext]' },
    },
    {
      test: /\.(gif|png|jpe?g|webp)$/,
      loader: 'file',
      options: { limit: 10240, name: '[name].[hash:8].[ext]' },
    },
  ];

  return rules;
};

export const getResolver = () => ({
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
});
