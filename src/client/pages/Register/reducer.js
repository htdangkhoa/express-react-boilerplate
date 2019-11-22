/* @flow */
import { type ActionType } from 'types';
import { REGISTER_ACTION } from './action';

const initialState = {
  registerSuccess: false,
};

export default (state: Object = initialState, action: ActionType) => {
  switch (action.type) {
    case REGISTER_ACTION.SUCCESS: {
      return { ...state, registerSuccess: true };
    }
    default:
      return { ...state };
  }
};
