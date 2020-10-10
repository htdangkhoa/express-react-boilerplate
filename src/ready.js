import { createServer } from 'http';
import {
  NODE_ENV,
  PORT,
  DB_HOST as host,
  DB_NAME as database,
  DB_USER as user,
  DB_PASS as password,
} from './config';
import useMongo from './mongo';

global.__CLIENT__ = false;
global.__SERVER__ = true;

(async () => {
  try {
    const { default: server } = await import('./server');

    await useMongo({
      host,
      database,
      user,
      password,
      app: server,
    });

    console.log(`Starting the ${NODE_ENV} server...`);

    createServer(server).listen(PORT, () => {
      console.log(`Server is started.`);
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
})();
