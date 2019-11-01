// @flow
import { resolve } from 'path';
import Express, { Router, type Request, type Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import React from 'react';
import { renderToStaticMarkupAsync } from 'react-async-ssr';
import { StaticRouter } from 'react-router';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import renderHtml from './utils/render-html';
import routes from './routes';
import { webpackMiddleware } from './middlewares';
import api from './api';
import { isDev } from './config';
import configureStore from './utils/configure-store';
import { resultModel } from './models/result.model';

const app = Express();

app.use(Express.static(resolve(__dirname, 'public')));

if (isDev) {
  app.use(webpackMiddleware());
}

app.use([
  cors({ origin: true }),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
]);

app.use('/api', api);

app.get('*', async (req: Request, res: Response) => {
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

    const App = (
      <Provider store={store}>
        <StaticRouter location={req.path} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );

    const htmlContent = await renderToStaticMarkupAsync(App);

    const head = Helmet.renderStatic();

    // if (context.url) {
    //   res.status(301).setHeader('location', context.url);

    //   return res.end();
    // }

    const status = context.status === '404' ? 404 : 200;

    return res
      .status(status)
      .send(renderHtml({ head, htmlContent, initialState: store.getState() }));
  } catch (error) {
    console.error(`==> 😭  Rendering routes error: ${error}`);

    return res.status(404).send('Not Found :(');
  }
});

export default app;
