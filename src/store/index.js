/* @flow */
import { createBrowserHistory, createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { requestMiddleware } from 'utils/request';
import { type ConfigureStoreType } from 'types';
import createReducers from './reducer';

const logger = createLogger({ predicate: (_getState, _action) => __DEV__ });

const configureStore = ({ initialState, url }: ConfigureStoreType) => {
  const isServer = typeof window === 'undefined';

  const history = isServer
    ? createMemoryHistory({ initialEntries: [url || '/'] })
    : createBrowserHistory();

  const middlewares = [
    routerMiddleware(history),
    thunk,
    requestMiddleware,
    logger,
  ];

  const enhancers = composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(
    createReducers(history),
    initialState || {},
    enhancers,
  );

  if (module.hot) {
    module.hot.accept('./reducer', async () => {
      try {
        const nextReducer = await import('./reducer');

        store.replaceReducer(nextReducer.default);
      } catch (error) {
        console.error(`==> 😭  Reducer hot reloading error ${error}`);
      }
    });
  }

  return {
    store,
    history,
  };
};

export default configureStore;
