/* @flow */
import { type Request, type Response } from 'express';
import { ObjectId } from 'mongodb';
import { usePaging } from 'mongo/helper';
import { resultModel, genericError, badRequest } from 'models/result.model';
import head from 'lodash/head';
import compact from 'lodash/compact';

const aggregateLookupUser = [
  {
    $lookup: {
      let: { user: '$user_id' },
      from: 'users',
      pipeline: [
        { $match: { $expr: { $eq: ['$$user', '$_id'] } } },
        { $project: { _id: true, name: true } },
      ],
      as: 'user',
    },
  },
  { $unwind: '$user' },
];

export const getPostsController = () => async (req: Request, res: Response) => {
  const {
    postsCollection,
    query: { skip = 0 },
  } = req;

  try {
    const { values: posts, metaData } = await usePaging({
      collection: postsCollection,
      aggregate: [...aggregateLookupUser, { $sort: { publishAt: -1 } }],
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
    const posts = await postsCollection
      .aggregate([{ $match: { _id: ObjectId(_id) } }, ...aggregateLookupUser])
      .toArray();

    return res.json(resultModel({ data: head(posts) }));
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
    user,
    postsCollection,
  } = req;

  const listTag = compact(tags.split(',').map((tag) => tag.trim()));

  if (!title || !description || !content || listTag.length === 0) {
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
        user_id: user._id,
      },
      { serializeFunction: true },
    );

    return res.json(resultModel({ data: head(ops) }));
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};
