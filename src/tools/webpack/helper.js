import { resolve } from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import { isDev } from '../../config';

const cwd = process.cwd();

const rulesOfCss = [
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
        context: resolve(cwd, 'src/client'),
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
];

export const getEntries = () => {
  let entries = [resolve(cwd, 'src/client/index.js')];

  if (isDev) {
    entries = [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
      ...entries,
    ];
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
      test: /\.css$/,
      use: [...rulesOfCss],
    },
    {
      test: /\.(scss|sass)$/,
      use: [
        ...rulesOfCss,
        {
          loader: 'sass',
          options: {
            sourceMap: isDev,
            sassOptions: {
              includePaths: [resolve(cwd, 'src/client')],
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
  ];

  return rules;
};

export const getResolver = () => ({
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
});
