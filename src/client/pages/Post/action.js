/* @flow */
import { type Dispatch } from 'redux';
import { type ApiDataType } from 'types';
import { actionGenerator } from 'utils';
import { requestAction } from 'utils/request';

export const GET_POSTS = actionGenerator('@@GET_POSTS');

export const getPostsAction = (skip?: number = 0) => (dispatch: Dispatch) =>
  dispatch(
    requestAction({
      url: '/post/newest',
      label: GET_POSTS.NAME,
      params: { skip },
      onSuccess: ({ data }: ApiDataType) => {
        dispatch({ type: GET_POSTS.SUCCESS, payload: data });
      },
      onError: ({ error }: ApiDataType) => {
        dispatch({ type: GET_POSTS.ERROR, payload: error });
      },
    }),
  );
