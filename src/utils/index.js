/* @flow */
import { type ApiActionType } from 'types';

export const actionGenerator = (actionName: string) => ({
  NAME: actionName,
  SUCCESS: `${actionName}_SUCCESS`,
  ERROR: `${actionName}_ERROR`,
});

export const apiActionGenerator = (options: ApiActionType) => ({
  type: '@@API',
  payload: {
    ...options,
  },
});

export const paging = (skip?: number = 0, limit?: number = 20) => {
  const l = Math.abs(Math.floor(limit));

  const s = Math.abs(Math.floor(skip)) * l;

  return { s, l };
};
