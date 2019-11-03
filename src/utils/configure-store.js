import { createBrowserHistory, createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { requestMiddleware } from './request';
import createReducers from '../reducers';
import { type ConfigureStoreType } from '../types';

const logger = createLogger({ predicate: (getState, action) => __DEV__ });

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

  return {
    store,
    history,
  };
};

export default configureStore;
