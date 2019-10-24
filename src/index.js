import { createServer } from 'http';
import hooks from './tools/hooks';

(async () => {
  await hooks();

  createServer(require('./app').default).listen(8888, () => {
    console.log('Server is listening on port 8888...');
  });
})();
