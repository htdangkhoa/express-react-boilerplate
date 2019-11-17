/* @flow */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/js/all';
import '@fortawesome/fontawesome-free/css/all.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { Suspense } from 'react';
import { AppContainer } from 'react-hot-loader';
import { render, hydrate } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Loading from 'components/Loading';
import configureStore from '../store';
import routes from '../routes';
import '../i18n';

const initialState = window.__INITIAL_STATE__;

delete window.__INITIAL_STATE__;

const { store, history } = configureStore({ initialState });

const bootstrap = (routesConfig: Array<Object>) => {
  const renderMethod = module.hot ? render : hydrate;

  renderMethod(
    <Suspense fallback={<Loading />}>
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            {renderRoutes(routesConfig)}
          </ConnectedRouter>
        </Provider>
      </AppContainer>
    </Suspense>,
    document.getElementById('react-view'),
  );
};

bootstrap(routes);

if (module.hot) {
  module.hot.accept('../routes', async () => {
    try {
      const nextRoutes = await import('../routes');

      bootstrap(nextRoutes.default);
    } catch (error) {
      console.error(`==> 😭  Routes hot reloading error ${error}`);
    }
  });
}
