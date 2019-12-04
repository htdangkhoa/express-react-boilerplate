import { createServer } from 'http';
import openBrowser from 'react-dev-utils/openBrowser';
import {
  NODE_ENV,
  PORT,
  isDev,
  DB_HOST as host,
  DB_NAME as database,
  DB_USER as user,
  DB_PASS as password,
} from './config';
import hooks from './tools/hooks';
import useMongo from './mongo';

global.__CLIENT__ = false;
global.__SERVER__ = true;

(async () => {
  hooks();

  try {
    const { default: server } = await import('./server');

    await useMongo({
      host,
      database,
      user,
      password,
      app: server,
    });

    createServer(server).listen(PORT, () => {
      console.clear();

      console.log(`Starting the ${NODE_ENV} server...`);

      if (isDev) {
        openBrowser(`http://localhost:${PORT}/`);
      }
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
})();
