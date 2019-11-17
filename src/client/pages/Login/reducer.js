/* @flow */
import { type ActionType } from 'types';
import { LOGIN_ACTION } from './action';

const initialState = {
  data: null,
  error: null,
};

export default (state: any = initialState, action: ActionType) => {
  switch (action.type) {
    case LOGIN_ACTION.SUCCESS: {
      const { data } = action.payload;

      return { ...state, ...data };
    }
    case LOGIN_ACTION.ERROR: {
      const { error } = action.payload;

      return { ...state, error };
    }
    default:
      return { ...state };
  }
};
