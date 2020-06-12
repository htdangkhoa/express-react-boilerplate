import { hostname } from 'os';
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
  let port = parseFloat(PORT);

  if (__DEV__) {
    const { default: portChecker } = await import('tcp-port-used');

    const isUsed = await portChecker.check(port);

    if (isUsed) {
      port += 1;
    }
  }

  process.env.PORT = port;

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

    createServer(server).listen(port, async () => {
      console.clear();

      console.log(`Starting the ${NODE_ENV} server...`);

      if (isDev && process.argv.includes('--serve')) {
        openBrowser(`http://localhost:${port}/`);
      }
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
})();
