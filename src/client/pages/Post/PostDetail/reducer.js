/* @flow */
import { type ActionType } from 'types';
import { GET_POST_DETAIL } from './action';

const initialState = {
  post: null,
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
    default:
      return { ...state };
  }
};
