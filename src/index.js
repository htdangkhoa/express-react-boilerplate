import { createServer } from 'http';
import hooks from './tools/hooks';

(async () => {
  hooks();

  const app = await import('./app');

  createServer(app.default).listen(8888, () => {
    console.log('Server is listening on port 8888...');
  });
})();
