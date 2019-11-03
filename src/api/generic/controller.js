/* @flow */
import { type Request, type Response } from 'express';
import { resultModel } from 'models/result.model';

export const meController = () => async (req: Request, res: Response) => {
  const { user } = req;

  return res.json(resultModel({ data: user }));
};
