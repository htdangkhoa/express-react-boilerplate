// @flow
import { type Request } from 'express';
import passport from 'passport';
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  type VerifiedCallback,
} from 'passport-jwt';

const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    passReqToCallback: true,
  },
  async (req: Request, payload: any, done: VerifiedCallback) => {},
);

passport.use(jwtStrategy);

export default passport;
