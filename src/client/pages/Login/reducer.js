/* @flow */
import { LOGIN_ACTION } from './action';
import { type ActionType } from 'types';
import cookies from 'utils/cookies';
import { toast } from 'react-toastify';

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

      toast.error(error.message);

      return { ...state, error };
    }
    default:
      return { ...state };
  }
};
