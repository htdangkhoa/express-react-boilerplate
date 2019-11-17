import { toast } from 'react-toastify';
import { apiActionGenerator, actionGenerator } from 'utils';
import { updateTokenAction } from 'store/action';

export const LOGIN_ACTION = actionGenerator('@@LOGIN_ACTION');
export const loginAction = (data) => (dispatch) =>
  dispatch(
    apiActionGenerator({
      label: LOGIN_ACTION.NAME,
      url: '/auth/login',
      method: 'POST',
      data,
      onSuccess: ({ data: res }) => {
        dispatch(updateTokenAction({ ...res }));
      },
      onError: ({ error }) => {
        toast.error(error.message);
      },
    }),
  );
