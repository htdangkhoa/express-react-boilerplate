/* @flow */
import { type Dispatch } from 'redux';
import { type ApiDataType } from 'types';
import { requestAction } from 'utils/request';
import { actionGenerator } from 'utils';

export const GET_POST_DETAIL = actionGenerator('@@GET_POST_DETAIL');

export const getPostDetailAction = (_id: string) => (dispatch: Dispatch) =>
  dispatch(
    requestAction({
      url: `/post/detail/${_id}`,
      label: GET_POST_DETAIL.NAME,
      onSuccess: ({ data }: ApiDataType) => {
        dispatch({ type: GET_POST_DETAIL.SUCCESS, payload: data });
      },
      onError: ({ error }: ApiDataType) => {
        dispatch({ type: GET_POST_DETAIL.ERROR, payload: error });
      },
    }),
  );
