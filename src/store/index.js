/* @flow */
import { createBrowserHistory, createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { type ConfigureStoreType } from 'types';
import createReducers from './reducer';

const configureStore = ({ initialState, url }: ConfigureStoreType) => {
  const isServer = typeof window === 'undefined';

  const history = isServer
    ? createMemoryHistory({ initialEntries: [url || '/'] })
    : createBrowserHistory();

  const middlewares = [routerMiddleware(history), thunk];

  const enhancers = composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(
    createReducers(history),
    initialState || {},
    enhancers,
  );

  if (module.hot) {
    module.hot.accept('./reducer', async () => {
      try {
        const { default: nextReducer } = await import('./reducer');

        store.replaceReducer(nextReducer(history));
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
