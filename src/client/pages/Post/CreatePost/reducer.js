/* @flow */
import type { ActionType } from 'types';
import { CREATE_POST, DELETE_LOCAL_POST } from './action';

const initialState = {
  post: null,
  error: null,
};

export default (state: any = initialState, action: ActionType) => {
  switch (action.type) {
    case CREATE_POST.SUCCESS: {
      return { ...state, post: action.payload, error: null };
    }
    case CREATE_POST.ERROR: {
      return { ...state, payload: null, error: action.payload };
    }
    case DELETE_LOCAL_POST: {
      return { ...state, error: null, post: null };
    }
    default:
      return state;
  }
};
