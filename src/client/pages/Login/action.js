import { toast } from 'react-toastify';
import { actionGenerator } from 'utils';
import { requestAction } from 'utils/request';
import { updateTokenAction } from 'store/action';

export const LOGIN_ACTION = actionGenerator('@@LOGIN_ACTION');
export const loginAction = (data) => (dispatch) =>
  dispatch(
    requestAction({
      url: '/auth/login',
      label: LOGIN_ACTION.NAME,
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
