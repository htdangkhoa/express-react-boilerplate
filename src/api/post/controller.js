/* @flow */
import { type Request, type Response } from 'express';
import { ObjectId } from 'mongodb';
import { usePaging } from 'mongo/helper';
import { resultModel, genericError, badRequest } from 'models/result.model';
import { compact, head } from 'lodash';

export const getPostsController = () => async (req: Request, res: Response) => {
  const {
    postsCollection,
    query: { skip = 0 },
  } = req;

  try {
    const { values: posts, metaData } = await usePaging({
      collection: postsCollection,
      skip,
    });

    return res.json(
      resultModel({
        data: { posts, metaData },
      }),
    );
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
    body: { title, description, content, tags = '' },
    postsCollection,
  } = req;

  const listTag = tags.split(',');

  if (!title || !description || !content || compact(listTag).length === 0) {
    return res.json(badRequest());
  }

  try {
    const { ops } = await postsCollection.insertOne(
      {
        title,
        description,
        content,
        tags: listTag,
        comments: [],
        viewers: [],
        publishAt: new Date(),
      },
      { serializeFunction: true },
    );

    return res.json(resultModel({ data: head(ops) }));
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};
