/* @flow */
import { type Request } from 'express';
import { ObjectId } from 'mongodb';
import passport from 'passport';
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  type VerifiedCallback,
} from 'passport-jwt';
import { unauthorized, resultModel } from 'models/result.model';
import { PUBLIC_KEY, TYPE_ACCESS } from './jwt';

const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUBLIC_KEY,
    passReqToCallback: true,
  },
  async (req: Request, payload: any, done: VerifiedCallback) => {
    const { user, usersCollection } = req;

    if (user) {
      return done(null, resultModel({ data: user }));
    }

    if (payload.type !== TYPE_ACCESS) {
      return done(null, unauthorized());
    }

    const document = await usersCollection.findOne({
      _id: ObjectId(payload._id),
    });

    if (!document) return done(null, unauthorized());

    return done(null, resultModel({ data: document }));
  },
);

passport.use(jwtStrategy);

export default passport;
