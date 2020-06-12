/* @flow */
import './vendor';
import '../i18n';
import React, { Suspense } from 'react';
import { AppContainer } from 'react-hot-loader';
import { render, hydrate } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { LastLocationProvider } from 'react-router-last-location';
import { loadableReady } from '@loadable/component';
import Loading from 'components/Loading';
import configureStore from '../store';
import routes from '../routes';

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
            <LastLocationProvider>
              <CookiesProvider>{renderRoutes(routesConfig)}</CookiesProvider>
            </LastLocationProvider>
          </ConnectedRouter>
        </Provider>
      </AppContainer>
    </Suspense>,
    document.getElementById('react-view'),
  );
};

loadableReady(() => {
  bootstrap(routes);
});

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

if (!__DEV__) {
  require('offline-plugin/runtime').install();
}
