import { resolve, join } from 'path';
import cssModuleRequireHook from 'css-modules-require-hook';
import sass from 'node-sass';
import assetRequireHook from 'asset-require-hook';
import { isDev } from '../config';

const hooks = async () => {
  await cssModuleRequireHook({
    extensions: ['.css', '.scss', '.sass'],
    preprocessCss: (data, file) => {
      return sass.renderSync({ data, file }).css;
    },
    devMode: isDev,
  });

  assetRequireHook({
    extensions: ['gif', 'jpg', 'jpeg', 'png', 'webp'],
    publicPath: resolve(__dirname, '..', 'client/assets'),
    limit: 10240,
    name: '[name].[hash:8].[ext]',
  });
};

export default hooks;
