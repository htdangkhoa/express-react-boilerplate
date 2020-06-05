/* @flow */
import { Dispatch } from 'redux';
import type { ApiDataType } from 'types';
import { actionGenerator } from 'utils';
import { requestAction } from 'utils/request';

export const CREATE_POST = actionGenerator('@@CREATE_POST');

export const createPostAction = (data: Object) => (dispatch: Dispatch) =>
  dispatch(
    requestAction({
      url: '/post/create-post',
      label: CREATE_POST.NAME,
      method: 'POST',
      data,
      onSuccess: ({ data: res }: ApiDataType) => {
        dispatch({ type: CREATE_POST.SUCCESS, payload: res });
      },
      onError: ({ error }: ApiDataType) => {
        dispatch({ type: CREATE_POST.ERROR, payload: error });
      },
    }),
  );

export const DELETE_LOCAL_POST = '@@DELETE_LOCAL_POST';

export const deleteLocalPostAction = () => (dispatch: Dispatch) =>
  dispatch({ type: DELETE_LOCAL_POST, payload: null });
