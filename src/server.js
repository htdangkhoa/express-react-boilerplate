/* @flow */
import { resolve } from 'path';
import Express, { type Request, type Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import serveFavicon from 'serve-favicon';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { LastLocationProvider } from 'react-router-last-location';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import renderHtml from './utils/render-html';
import routes from './routes';
import {
  passportMiddleware,
  notFoundErrorMiddleware,
  serverErrorMiddleware,
} from './middlewares';
import api from './api';
import { isDev } from './config';
import configureStore from './store';

const app = Express();

app.use([
  cors({ origin: true, credentials: false }),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  serveFavicon(resolve(process.cwd(), 'public/assets/favicon.ico')),
  compression(),
  helmet(),
]);

app.use(Express.static(resolve(process.cwd(), 'public')));

if (isDev) {
  const { webpackMiddleware } = require('./middlewares');

  app.use(webpackMiddleware());
}

app.use(
  passportMiddleware([
    /^(?!.*api).*/g,
    /^(?!.*^\/api\/auth\/logout)(\/api\/auth)/,
    /^(?!.*^\/api\/post\/create-post)(\/api\/post)/,
    /^(?!.*^\/api\/comment\/post-comment)(\/api\/comment)/,
  ]),
);

app.use('/api', api);

app.use('/api', serverErrorMiddleware());

app.use('/api', notFoundErrorMiddleware());

app.get('/*', async (req: Request, res: Response) => {
  const { store } = configureStore({ url: req.url });

  const loadBranchData = (): Promise<any> => {
    const branches = matchRoutes(routes, req.path);

    const promises = branches.map(({ route, match }) => {
      if (route.loadData) {
        return Promise.all(
          route
            .loadData({ params: match.params, getState: store.getState })
            .map((action) => store.dispatch(action)),
        );
      }

      return Promise.resolve(null);
    });

    return Promise.all(promises);
  };

  try {
    await loadBranchData();

    const context = {};

    const statsFile = resolve(process.cwd(), 'public/loadable-stats.json');

    const extractor = new ChunkExtractor({ statsFile });

    const App = (
      <ChunkExtractorManager extractor={extractor}>
        <Provider store={store}>
          <StaticRouter location={req.path} context={context}>
            <LastLocationProvider>
              <CookiesProvider cookies={req.universalCookies}>
                {renderRoutes(routes)}
              </CookiesProvider>
            </LastLocationProvider>
          </StaticRouter>
        </Provider>
      </ChunkExtractorManager>
    );

    const body = [];

    return ReactDOMServer.renderToStaticNodeStream(App)
      .on('data', (chunk) => {
        body.push(chunk.toString());
      })
      .on('error', (error) => {
        return res.status(404).send(error.message);
      })
      .on('end', () => {
        const htmlContent = body.join('');

        if (context.url) {
          res.status(301).setHeader('location', context.url);

          return res.end();
        }

        const status = context.status === '404' ? 404 : 200;

        const initialState = store.getState();

        const head = Helmet.renderStatic();

        return res
          .status(status)
          .send(renderHtml({ head, extractor, htmlContent, initialState }));
      });
  } catch (error) {
    console.error(error);

    console.error(`==> 😭  Rendering routes error: ${error}`);

    return res.status(404).send('Not Found :(');
  }
});

export default app;
