/* @flow */
import { type Request, type Response, type NextFunction } from 'express';
import { notFoundError } from 'models/result.model';

const notFoundErrorMiddleware = () => async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => res.json(notFoundError());

export default notFoundErrorMiddleware;
