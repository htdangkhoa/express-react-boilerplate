/* @flow */
import moment from 'moment-timezone';

export const actionGenerator = (actionName: string) => ({
  NAME: actionName,
  SUCCESS: `${actionName}_SUCCESS`,
  ERROR: `${actionName}_ERROR`,
});

export const formatDate = (date: Date | string) =>
  moment(date).format('MMM DD, YYYY');
