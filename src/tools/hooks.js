import { resolve, join } from 'path';
import cssModuleRequireHook from 'css-modules-require-hook';
import sass from 'node-sass';
import assetRequireHook from 'asset-require-hook';

const hooks = () => {
  cssModuleRequireHook({
    generateScopedName: __DEV__ ? '[local]' : '[hash:base64:5]',
    extensions: ['.css', '.scss', '.sass'],
    preprocessCss: (data, file) => {
      return sass.renderSync({ data, file }).css;
    },
    devMode: __DEV__,
  });

  assetRequireHook({
    extensions: ['gif', 'jpg', 'jpeg', 'png', 'webp'],
    publicPath: resolve(__dirname, '..', 'client/assets'),
    limit: 10240,
    name: '[name].[hash:8].[ext]',
  });

  assetRequireHook({
    extensions: ['woff', 'woff2', 'ttf', 'eot', 'svg'],
    publicPath: resolve(__dirname, '..', 'client/assets'),
    limit: 10240,
    name: '[name].[hash:8].[ext]',
  });
};

export default hooks;
