/* @flow */
import { type Request, type Response, type NextFunction } from 'express';
import isArray from 'lodash/isArray';
import { internalServerError } from 'models/result.model';

const serverErrorMiddleware = () => async (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let message = '';

  if (isArray(err.error)) {
    message = err.error.map((e) => `${e.param}: ${e.msg}`).toString();
  } else {
    message = !err.error
      ? err.message
      : `${err.error.message} ${err.error.detail || ''}`;
  }

  return res.json(internalServerError({ message }));
};

export default serverErrorMiddleware;
