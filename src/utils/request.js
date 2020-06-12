/* @flow */
import axios, { type AxiosError } from 'axios';
import omit from 'lodash/omit';
import { type Dispatch } from 'redux';
import { type RequestType, type ApiActionType, type ApiDataType } from 'types';
import { updateLoadingAction } from 'store/action';
import cookies from './cookies';
import { actionGenerator } from './';

const getBaseUrl = () => {
  if (!__DEV__) return 'https://htdangkhoa-erb.herokuapp.com/api';

  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}/api`;
  }

  return `http://localhost:${String(process.env.PORT)}/api`;
};

const baseUrl = getBaseUrl();

export const request = async ({
  host = baseUrl,
  url = '',
  method,
  params = {},
  data = {},
  headers = {},
  token,
}: RequestType) => {
  const authorization = token || cookies.get('accessToken');

  let config = {
    method,
    params,
    data,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
      ...headers,
    },
  };

  if (method === 'GET' || method === 'DELETE') {
    config = omit(config, ['data']);
  }

  const result = await axios({
    url: `${host}${url}`,
    ...config,
  });

  return result;
};

export const requestAction = (options: ApiActionType) => async (
  dispatch: Dispatch,
) => {
  if (__CLIENT__) {
    dispatch(updateLoadingAction(true));
  }

  const opt = omit(options, ['onSuccess', 'onError']);

  const requestOptions: RequestType = (opt: RequestType);

  const ACTION = actionGenerator(`${options.label || 'REQUEST_API_ACTION'}`);

  try {
    const { data: res } = await request(requestOptions);

    if (__CLIENT__) {
      dispatch(updateLoadingAction(false));
    }

    const result: ApiDataType = (res: ApiDataType);

    // eslint-disable-next-line no-unused-vars
    const { code = 200, data, error } = result;

    if (code !== 200 && options.onError) {
      return options.onError(result);
    }

    if (options.onSuccess) {
      return options.onSuccess(result);
    }

    return dispatch({
      type: code === 200 ? ACTION.SUCCESS : ACTION.ERROR,
      payload: result,
    });
  } catch (err) {
    console.error(err);

    if (__CLIENT__) {
      dispatch(updateLoadingAction(false));
    }

    const {
      response: { data: res },
    }: AxiosError = (err: AxiosError);

    const result: ApiDataType = (res: ApiDataType);

    // eslint-disable-next-line no-unused-vars
    const { code = 200, data, error } = result;

    if (options.onError) {
      return options.onError(result);
    }

    return dispatch({ type: ACTION.ERROR, payload: result });
  }
};
