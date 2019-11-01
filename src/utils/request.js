// @flow
import axios from 'axios';
import { omit } from 'lodash';
import { type MiddlewareAPI, type Dispatch, type Action } from 'redux';
import { type RequestType, type ApiActionType, type ApiDataType } from 'types';
import cookies from './cookies';
import { actionGenerator } from './';

const baseUrl = 'http://localhost:8888/api';

export const request = async ({
  host = baseUrl,
  url = '',
  method,
  params = {},
  data = {},
  headers = {},
  token,
}: RequestType) => {
  const authorization = token || cookies.get('token');

  let config = {
    data,
    params,
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

export const requestMiddleware = ({ dispatch, getState }: MiddlewareAPI) => (
  next: Dispatch,
) => (action: Action) => {
  next(action);

  if (!action.type || action.type !== '@@API') {
    return;
  }

  const apiAction: ApiActionType = (action.payload: ApiActionType);

  const ACTION = actionGenerator(`${apiAction.label || 'REQUEST_API_ACTION'}`);

  let requestOptions = omit({ ...apiAction }, ['onSuccess', 'onError']);

  dispatch({
    type: ACTION.PENDING,
    payload: apiAction.url || '',
  });

  request({ ...requestOptions })
    .then((res) => {
      const result: ApiDataType = (res.data: ApiDataType);

      const { code = 200, data, error } = result;

      let resultAction = { payload: { ...result } };

      switch (code) {
        case 200: {
          resultAction = { type: ACTION.SUCCESS, ...resultAction };

          dispatch(resultAction);

          apiAction.onSuccess && apiAction.onSuccess(result);

          break;
        }
        default: {
          resultAction = { type: ACTION.ERROR, ...resultAction };

          dispatch(resultAction);

          apiAction.onError && apiAction.onError(result);

          break;
        }
      }
    })
    .catch((err) => {
      const result: ApiDataType = (err.response.data: ApiDataType);

      const { code = 200, data, error } = result;

      dispatch({ type: ACTION.ERROR, payload: { ...result } });
    });
};
