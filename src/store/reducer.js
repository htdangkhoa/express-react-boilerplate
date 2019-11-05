/* @flow */
import { type ActionType, type GlobalStateType } from 'types';
import { combineReducers } from 'redux';
import { type History } from 'history';
import { reducer as form } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import { GLOBAL_ACTIONS } from './action';
import home from '../client/pages/Home/reducer';
import login from '../client/pages/Login/reducer';

const initialState: GlobalStateType = {
  loading: false,
  accessToken: null,
  refreshToken: null,
};

const global = (state: any = initialState, action: ActionType) => {
  switch (action.type) {
    case GLOBAL_ACTIONS.UPDATE_TOKEN: {
      return { ...action.payload };
    }
    case GLOBAL_ACTIONS.UPDATE_LOADING: {
      return { ...state, loading: action.payload.loading };
    }
    default:
      return { ...state };
  }
};

const createReducers = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    form,
    global,
    home,
    login,
  });

export default createReducers;
