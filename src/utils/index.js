/* @flow */
import moment from 'moment-timezone';

export const actionGenerator = (actionName: string) => ({
  NAME: actionName,
  SUCCESS: `${actionName}_SUCCESS`,
  ERROR: `${actionName}_ERROR`,
});

export const paging = (skip?: number = 0, limit?: number = 20) => {
  const rawSkip = Math.abs(Math.floor(skip));

  const l = Math.abs(Math.floor(limit));

  const s = rawSkip * l;

  return { rawSkip, s, l };
};

export const formatDate = (date: Date | string) =>
  moment(date).format('MMM DD, YYYY');
