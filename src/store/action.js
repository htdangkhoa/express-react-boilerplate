/* @flow */
import { type GlobalStateType, type ApiDataType, type ThemeType } from 'types';
import { type Dispatch } from 'redux';
import { actionGenerator } from 'utils';
import { requestAction } from 'utils/request';
import cookies from 'utils/cookies';

export const UPDATE_TOKEN = '@@UPDATE_TOKEN';
export const updateTokenAction = (payload?: GlobalStateType) => (
  dispatch: Dispatch,
) => {
  if (!payload?.accessToken || !payload?.refreshToken) {
    cookies.remove('accessToken', { path: '/' });
    cookies.remove('refreshToken', { path: '/' });
  } else {
    cookies.set('accessToken', payload?.accessToken, { path: '/' });
    cookies.set('refreshToken', payload?.refreshToken, { path: '/' });
  }

  return dispatch({
    type: UPDATE_TOKEN,
    payload: {
      accessToken: payload?.accessToken,
      refreshToken: payload?.refreshToken,
    },
  });
};

export const fetchTokenAction = () => (dispatch: Dispatch) =>
  dispatch(
    updateTokenAction({
      accessToken: cookies.get('accessToken'),
      refreshToken: cookies.get('refreshToken'),
    }),
  );

export const UPDATE_LOADING = '@@UPDATE_LOADING';
export const updateLoadingAction = (isLoading: boolean) => (
  dispatch: Dispatch,
) => dispatch({ type: UPDATE_LOADING, payload: isLoading });

export const UPDATE_THEME = '@@UPDATE_THEME';
export const updateThemeAction = (theme: ThemeType = 'light') => (
  dispatch: Dispatch,
) => {
  localStorage.setItem('theme', theme);

  if (document.documentElement) {
    document.documentElement.setAttribute('theme', theme);
  }

  return dispatch({ type: UPDATE_THEME, payload: theme });
};

export const RENEW_TOKEN = actionGenerator('@@RENEW_TOKEN');
export const renewTokenAction = (data: Object) => (dispatch: Dispatch) =>
  dispatch(
    requestAction({
      url: '/auth/renew-token',
      label: RENEW_TOKEN.NAME,
      method: 'POST',
      data,
      onSuccess: ({ data: res }: ApiDataType) => {
        // $FlowFixMe
        dispatch(updateTokenAction({ ...res }));
      },
      onError: (_res: ApiDataType) => {
        dispatch(updateTokenAction());
      },
    }),
  );

export const GET_ME = actionGenerator('@@GET_ME');
export const getMeAction = () => async (
  dispatch: Dispatch,
  getState: () => Object,
) => {
  const {
    global: { accessToken },
  } = getState();

  if (!accessToken) {
    return dispatch({ type: GET_ME.ERROR, payload: null });
  }

  return dispatch(
    requestAction({
      url: '/me',
      label: GET_ME.NAME,
      onSuccess: ({ data }: ApiDataType) => {
        dispatch({
          type: GET_ME.SUCCESS,
          payload: data,
        });
      },
      onError: async ({ code, error }: ApiDataType) => {
        if (code === 401) {
          await dispatch(updateTokenAction());
        }

        await dispatch({ type: GET_ME.ERROR, payload: error });
      },
    }),
  );
};
