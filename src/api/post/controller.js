/* @flow */
import { type Request, type Response } from 'express';
import { paging } from 'utils';
import { resultModel, genericError } from 'models/result.model';

export const getPostsController = () => async (req: Request, res: Response) => {
  const { postsCollection, skip = 0 } = req;

  const { s, l } = paging(skip);

  try {
    const posts = await postsCollection
      .find()
      .skip(s)
      .limit(l)
      .toArray();

    return res.json(resultModel({ data: posts }));
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};
