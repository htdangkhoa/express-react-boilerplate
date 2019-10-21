// @flow
import { type ActionType } from '../../../types';
import { FETCH_USER } from './action';

const initialState = {
  users: [],
};

export default (state: any = initialState, action: ActionType) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, users: [...action.payload] };
    default:
      return { ...state };
  }
};
