/* @flow */
import { type Dispatch } from 'redux';
import { type PostCommentActionType, type ApiDataType } from 'types';
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

export const GET_COMMENTS = actionGenerator('@@GET_COMMENTS');

export const getCommentsAction = (_id: string) => (dispatch: Dispatch) =>
  dispatch(
    requestAction({
      url: `/comment/get-comments/${_id}`,
      label: GET_COMMENTS.NAME,
      onSuccess: ({ data }: ApiDataType) => {
        dispatch({ type: GET_COMMENTS.SUCCESS, payload: data });
      },
      onError: ({ error }: ApiDataType) => {
        dispatch({ type: GET_COMMENTS.ERROR, payload: error });
      },
    }),
  );

export const POST_COMMENT = actionGenerator('@@POST_COMMENT');

export const postCommentAction = (data: PostCommentActionType) => (
  dispatch: Dispatch,
) =>
  dispatch(
    requestAction({
      url: '/comment/post-comment',
      label: POST_COMMENT.NAME,
      data,
      method: 'POST',
      onSuccess: ({ data: res }: ApiDataType) => {
        dispatch({ type: POST_COMMENT.SUCCESS, payload: res });
      },
      onError: ({ error }: ApiDataType) => {
        dispatch({ type: POST_COMMENT.ERROR, payload: error });
      },
    }),
  );
