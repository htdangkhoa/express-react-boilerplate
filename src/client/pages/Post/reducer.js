/* @flow */
import { type ActionType } from 'types';
import { GET_POSTS } from './action';

const initialState = {
  posts: [],
  error: null,
};

export default (state: any = initialState, action: ActionType) => {
  switch (action.type) {
    case GET_POSTS.SUCCESS: {
      return { ...state, posts: [...state.posts, ...action.payload] };
    }
    case GET_POSTS.ERROR: {
      return { ...state, error: action.payload };
    }
    default:
      return { ...state };
  }
};
