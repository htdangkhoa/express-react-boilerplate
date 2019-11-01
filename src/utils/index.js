// @flow
import { type RequestType, type ApiActionType } from 'types';

export const actionGenerator = (actionName: string) => ({
  NAME: actionName,
  PENDING: `${actionName}_PENDING`,
  SUCCESS: `${actionName}_SUCCESS`,
  ERROR: `${actionName}_ERROR`,
});

export const apiActionGenerator = (options: ApiActionType) => ({
  type: '@@API',
  payload: {
    ...options,
  },
});
