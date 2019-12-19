/* @flow */
import { type Request, type Response } from 'express';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import head from 'lodash/head';
import {
  badRequest,
  resultModel,
  genericError,
  unauthorized,
} from 'models/result.model';
import { sign, verify, TYPE_ACCESS, TYPE_REFRESH } from '../../secure/jwt';

const hashPassword = (password: string): string =>
  hashSync(password, genSaltSync());

const generateToken = (userId: string) => ({
  accessToken: sign({ _id: userId, type: TYPE_ACCESS }),
  refreshToken: sign({ _id: userId, type: TYPE_REFRESH }, 604800), // 7 days.
});

export const registerController = () => async (req: Request, res: Response) => {
  const {
    body: { email, password, name },
    usersCollection,
  } = req;

  if (!email || !password || !name) {
    return res.json(badRequest());
  }

  try {
    const user = await usersCollection.findOne({ email });

    if (user) {
      return res.json(unauthorized({ message: 'User already exist.' }));
    }

    const { ops: data } = await usersCollection.insertOne(
      { email, password: hashPassword(password), name },
      { serializeFunctions: true },
    );

    return res.json(resultModel({ data: head(data) }));
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};

export const loginController = () => async (req: Request, res: Response) => {
  const {
    body: { email, password },
    usersCollection,
  } = req;

  if (!email || !password) {
    return res.json(badRequest());
  }

  try {
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.json(genericError({ message: 'User not found.' }));
    }

    if (!compareSync(password, user.password)) {
      return res.json(genericError({ message: 'Password does not match.' }));
    }

    const data = generateToken(user._id);

    return res.json(resultModel({ data }));
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};

export const renewTokenController = () => async (
  req: Request,
  res: Response,
) => {
  const {
    body: { refreshToken },
  } = req;

  if (!refreshToken) {
    return res.json(badRequest());
  }

  try {
    const payload = verify(refreshToken);

    if (!payload || payload?.type !== TYPE_REFRESH) {
      return res.json(unauthorized());
    }

    const newToken = generateToken(payload._id);

    return res.json(resultModel({ data: newToken }));
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};
