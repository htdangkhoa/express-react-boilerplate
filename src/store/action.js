/* @flow */
import { type GlobalStateType } from 'types';
import { type Dispatch } from 'redux';
import { actionGenerator } from 'utils';
import cookies from 'utils/cookies';

export const GLOBAL_ACTIONS = {
  UPDATE_TOKEN: '@@UPDATE_TOKEN',
  UPDATE_LOADING: '@@UPDATE_LOADING',
};

export const updateTokenAction = (payload?: GlobalStateType) => (
  dispatch: Dispatch,
) => {
  if (!payload?.accessToken || !payload?.refreshToken) {
    cookies.remove('accessToken');
    cookies.remove('refreshToken');
  } else {
    cookies.set('accessToken', payload?.accessToken);
    cookies.set('refreshToken', payload?.refreshToken);
  }

  return dispatch({
    type: GLOBAL_ACTIONS.UPDATE_TOKEN,
    payload,
  });
};

export const fetchTokenAction = () =>
  updateTokenAction({
    accessToken: cookies.get('accessToken'),
    refreshToken: cookies.get('refreshToken'),
  });

export const updateLoadingAction = (loading: Boolean) => (dispatch: Dispatch) =>
  dispatch({ type: GLOBAL_ACTIONS.UPDATE_LOADING, payload: { loading } });
