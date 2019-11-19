/* @flow */
import { combineReducers } from 'redux';
import { type ActionType } from 'types';
import { GET_POSTS } from './action';
import postDetail from './PostDetail/reducer';

const initialState = {
  posts: [],
  error: null,
};

const post = (state: any = initialState, action: ActionType) => {
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

export default combineReducers({ post, postDetail });
