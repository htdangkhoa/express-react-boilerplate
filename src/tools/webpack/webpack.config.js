import { isDev } from '../../config';

export default isDev
  ? require('./webpack.config.dev').default
  : require('./webpack.config.prod').default;
