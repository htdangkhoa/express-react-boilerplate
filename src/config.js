const { NODE_ENV = 'development' } = process.env;

const isDev = NODE_ENV !== 'production';

module.exports = {
  NODE_ENV,
  isDev,
};
