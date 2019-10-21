import React from 'react';
import { render, hydrate } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from '../utils/configure-store';
import routes from '../routes';

const initialState = window.__INITIAL_STATE__;

delete window.__INITIAL_STATE__;

const { store, history } = configureStore({ initialState });

const bootstrap = (routes: Array<Object>) => {
  const renderMethod = !!module.hot ? render : hydrate;

  renderMethod(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {renderRoutes(routes)}
      </ConnectedRouter>
    </Provider>,
    document.getElementById('react-view'),
  );
};

bootstrap(routes);

if (module.hot) {
  module.hot.accept();
}
