import { resolve } from 'path';
import webpack from 'webpack';
import ImageminWebpackPlugin from 'imagemin-webpack-plugin';
import CompressionWebpackPlugin from 'compression-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import {
  getEntries,
  getOutPut,
  getPlugins,
  getRules,
  getResolver,
} from './helper';

const cwd = process.cwd();

export default {
  mode: 'production',
  entry: getEntries(),
  output: getOutPut(),
  plugins: [
    ...getPlugins(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ImageminWebpackPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      minFileSize: 1024,
      pngquant: { quality: '70-100' },
    }),
    new CompressionWebpackPlugin({
      test: /\.(js|css|html|svg)?$/,
      threshold: 1024,
      cache: false,
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
          src: resolve(cwd, 'public/assets/favicon-512x512.png'),
          sizes: [72, 96, 128, 144, 192, 384, 512],
        },
        {
          src: resolve(cwd, 'public/assets/favicon-512x512.png'),
          sizes: [120, 152, 167, 180],
          ios: true,
        },
      ],
      filename: 'site.webmanifest',
      start_url: '.',
      display: 'standalone',
    }),
    // new OfflinePlugin({
    //   autoUpdate: true,
    //   appShell: '/',
    //   relativePaths: false,
    //   updateStrategy: 'all',
    //   externals: ['/'],
    //   responseStrategy: 'network-first',
    // }),
  ],
  module: {
    rules: getRules(),
  },
  ...getResolver(),
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            booleans: true,
            pure_funcs: [
              'console.log',
              'console.info',
              'console.debug',
              'console.warn',
            ],
          },
          warnings: false,
          mangle: true,
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  performance: { hints: false },
};
