import { createServer } from 'http';
import {
  NODE_ENV,
  DB_HOST as host,
  DB_NAME as database,
  DB_USER as user,
  DB_PASS as password,
} from './config';
import hooks from './tools/hooks';
import useMongo from './mongo';

(async () => {
  hooks();

  try {
    const { default: server } = await import('./server');

    const { client, db } = await useMongo({
      host,
      database,
      user,
      password,
      app: server,
    });

    createServer(server).listen(8888, () => {
      console.log(`Starting the ${NODE_ENV} server...`);
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
})();
