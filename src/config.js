const {
  NODE_ENV = 'development',
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
} = process.env;

const isDev = NODE_ENV !== 'production';

global.__DEV__ = isDev;

module.exports = {
  NODE_ENV,
  isDev,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
};
