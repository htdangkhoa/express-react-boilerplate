/* @flow */
import { type ActionType, type GlobalStateType } from 'types';
import { combineReducers } from 'redux';
import { type History } from 'history';
import { reducer as form } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import login from 'pages/Login/reducer';
import register from 'pages/Register/reducer';
import postReducer from 'pages/Post/reducer';
import { UPDATE_TOKEN, UPDATE_LOADING, UPDATE_THEME, GET_ME } from './action';

const initialState: GlobalStateType = {
  isLoading: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  theme: 'light',
};

const global = (state: any = initialState, action: ActionType) => {
  switch (action.type) {
    case UPDATE_TOKEN: {
      let s = {
        ...state,
        ...action.payload,
      };

      if (!s.accessToken) {
        s = { ...s, user: null };
      }

      return s;
    }
    case UPDATE_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case UPDATE_THEME: {
      return { ...state, theme: action.payload };
    }
    case GET_ME.SUCCESS: {
      return { ...state, user: action.payload };
    }
    case GET_ME.ERROR: {
      return { ...state, user: null };
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
    login,
    register,
    postReducer,
  });

export default createReducers;
