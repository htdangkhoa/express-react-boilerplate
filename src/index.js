import { createServer } from 'http';
import hooks from './tools/hooks';

(async () => {
  hooks();

  const server = await import('./server');

  createServer(server.default).listen(8888, () => {
    console.log('Server is listening on port 8888...');
  });
})();
