// @flow
import { type Request, type Response } from 'express';
import { badRequest, success } from 'models/result.model';

export const loginController = () => async (req: Request, res: Response) => {
  const {
    body: { email, password },
  } = req;

  if (!email || !password) {
    return res.json(badRequest());
  }

  return res.json(success());
};
