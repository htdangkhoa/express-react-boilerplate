/* @flow */
import { type Request, type Response } from 'express';
import { ObjectId } from 'mongodb';
import { paging } from 'utils';
import { resultModel, genericError, badRequest } from 'models/result.model';
import { compact } from 'lodash';

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

export const getPostDetailController = () => async (
  req: Request,
  res: Response,
) => {
  const {
    params: { _id },
    postsCollection,
  } = req;

  if (!_id || !ObjectId.isValid(_id)) {
    return res.json(badRequest());
  }

  try {
    const post = await postsCollection.findOne({ _id: ObjectId(_id) });

    return res.json(resultModel({ data: post }));
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};

export const createPostController = () => async (
  req: Request,
  res: Response,
) => {
  const {
    body: { title, content, tags = '' },
    postsCollection,
  } = req;

  const listTag = tags.split(',');

  if (!title || !content || compact(listTag).length === 0) {
    return res.json(badRequest());
  }

  try {
    const { ops: data } = await postsCollection.insertOne(
      {
        title,
        content,
        tags: listTag,
        comments: [],
        viewers: [],
      },
      { serializeFunction: true },
    );

    return res.json(resultModel({ data }));
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};
