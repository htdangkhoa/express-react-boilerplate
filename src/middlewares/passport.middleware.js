/* @flow */
import { type Request, type Response, type NextFunction } from 'express';
import { unauthorized } from 'models/result.model';
import passport from '../secure/passport';

const passportMiddleware = (whiteList: string[] = []) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const matchRoutes =
    whiteList
      .map((condition) => req.originalUrl.match(condition))
      .filter((item) => item !== null) || [];

  if (matchRoutes.length !== 0) {
    return next();
  }

  return passport.authenticate('jwt', { session: false }, (error, result) => {
    if (!result) return res.status(401).json(unauthorized());

    if (result.code !== 200) return res.status(401).json(result);

    req.user = result.data;

    return next();
  })(req, res, next);
};

export default passportMiddleware;
