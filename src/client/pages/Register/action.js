/* @flow */
import { type Dispatch } from 'redux';
import { toast } from 'react-toastify';
import { type ApiDataType } from 'types';
import { actionGenerator, apiActionGenerator } from 'utils';

export const REGISTER_ACTION = actionGenerator('@@REGISTER_ACTION');
export const registerAction = (data: Object) => (dispatch: Dispatch) =>
  dispatch(
    apiActionGenerator({
      url: '/auth/register',
      method: 'POST',
      data,
      onSuccess: (_res: ApiDataType) =>
        dispatch({ type: REGISTER_ACTION.SUCCESS }),
      onError: ({ error }: ApiDataType) => {
        toast.error(error?.message);
      },
    }),
  );
