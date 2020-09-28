/* @flow */
import dayjs from 'dayjs';

export const actionGenerator = (actionName: string) => ({
  NAME: actionName,
  SUCCESS: `${actionName}_SUCCESS`,
  ERROR: `${actionName}_ERROR`,
});

export const formatDate = (date: Date | string) =>
  dayjs(date).format('MMM DD, YYYY');
