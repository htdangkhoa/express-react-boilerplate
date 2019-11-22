const { resolve } = require('path');
const { isDev } = require('../src/config');

module.exports = {
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
};
