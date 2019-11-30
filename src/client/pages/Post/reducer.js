/* @flow */
import { combineReducers } from 'redux';
import { type ActionType } from 'types';
import { GET_POSTS } from './action';
import postDetail from './PostDetail/reducer';
import createPost from './CreatePost/reducer';

const initialState = {
  posts: [],
  metaData: {
    index: 0,
    total: 0,
  },
  error: null,
};

const post = (state: any = initialState, action: ActionType) => {
  switch (action.type) {
    case GET_POSTS.SUCCESS: {
      const { posts, metaData } = action.payload;

      return {
        ...state,
        posts: [...posts],
        metaData: { ...metaData },
      };
    }
    case GET_POSTS.ERROR: {
      return { ...state, error: action.payload };
    }
    default:
      return { ...state };
  }
};

export default combineReducers({ post, postDetail, createPost });
