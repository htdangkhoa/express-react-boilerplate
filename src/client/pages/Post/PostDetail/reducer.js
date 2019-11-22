/* @flow */
import { type ActionType } from 'types';
import { GET_POST_DETAIL, GET_COMMENTS, POST_COMMENT } from './action';

const initialState = {
  post: null,
  comments: [],
  error: null,
};

export default (state: any = initialState, action: ActionType) => {
  switch (action.type) {
    case GET_POST_DETAIL.SUCCESS: {
      return { ...state, post: action.payload };
    }
    case GET_POST_DETAIL.ERROR: {
      return { ...state, error: action.payload };
    }
    case GET_COMMENTS.SUCCESS: {
      return { ...state, comments: [...action.payload] };
    }
    case GET_COMMENTS.ERROR: {
      return { ...state, error: { ...action.payload } };
    }
    case POST_COMMENT.SUCCESS: {
      return { ...state, comments: [...state.comments, action.payload] };
    }
    case POST_COMMENT.ERROR: {
      return { ...state, error: { ...action.payload } };
    }
    default:
      return { ...state };
  }
};
