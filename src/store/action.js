/* @flow */
import { type GlobalStateType, type ApiDataType, type ThemeType } from 'types';
import { type Dispatch } from 'redux';
import { actionGenerator, apiActionGenerator } from 'utils';
import cookies from 'utils/cookies';

export const UPDATE_TOKEN = '@@UPDATE_TOKEN';
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
    type: UPDATE_TOKEN,
    payload: {
      accessToken: payload?.accessToken,
      refreshToken: payload?.refreshToken,
    },
  });
};

export const fetchTokenAction = () =>
  updateTokenAction({
    accessToken: cookies.get('accessToken'),
    refreshToken: cookies.get('refreshToken'),
  });

export const UPDATE_LOADING = '@@UPDATE_LOADING';
export const updateLoadingAction = (isLoading: boolean) => (
  dispatch: Dispatch,
) => dispatch({ type: UPDATE_LOADING, payload: isLoading });

export const UPDATE_THEME = '@@UPDATE_THEME';
export const updateThemeAction = (theme: ThemeType = 'light') => (
  dispatch: Dispatch,
) => {
  localStorage.setItem('theme', theme);

  return dispatch({ type: UPDATE_THEME, payload: theme });
};

export const RENEW_TOKEN = actionGenerator('@@RENEW_TOKEN');
export const renewTokenAction = (data: Object) => (dispatch: Dispatch) =>
  dispatch(
    apiActionGenerator({
      url: '/auth/renew-token',
      method: 'POST',
      data,
      label: RENEW_TOKEN.NAME,
      onSuccess: ({ data: res }: ApiDataType) => {
        dispatch(updateTokenAction({ ...res }));
      },
      onError: (_res: ApiDataType) => {
        dispatch(updateTokenAction());
      },
    }),
  );

export const GET_ME = actionGenerator('@@GET_ME');
export const getMeAction = () => async (dispatch: Dispatch) =>
  dispatch(
    apiActionGenerator({
      url: '/me',
      label: GET_ME.NAME,
      onSuccess: ({ data }: ApiDataType) => {
        dispatch({
          type: GET_ME.SUCCESS,
          payload: data,
        });
      },
      onError: ({ error }: ApiDataType) => {
        dispatch({ type: GET_ME.ERROR, payload: error });
      },
    }),
  );
