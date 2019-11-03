/* @flow */
import { combineReducers } from 'redux';
import { type History } from 'history';
import { connectRouter } from 'connected-react-router';
import home from '../client/pages/Home/reducer';

const createReducers = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    home,
  });

export default createReducers;
