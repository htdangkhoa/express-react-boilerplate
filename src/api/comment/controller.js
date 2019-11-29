/* @flow */
import { type Request, type Response } from 'express';
import { ObjectId } from 'mongodb';
import { head } from 'lodash';
import { genericError, resultModel } from 'models/result.model';

export const getCommentsController = () => async (
  req: Request,
  res: Response,
) => {
  const {
    params: { _id },
    commentsCollection,
  } = req;

  try {
    const comments = await commentsCollection
      .find({ post_id: ObjectId(_id) })
      .toArray();

    return res.json(resultModel({ data: comments }));
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};

export const postCommentController = () => async (
  req: Request,
  res: Response,
) => {
  const {
    body: { _id, comment },
    user,
    commentsCollection,
  } = req;

  try {
    const { ops: data } = await commentsCollection.insertOne(
      {
        post_id: ObjectId(_id),
        user_id: ObjectId(user._id),
        comment,
        createAt: new Date(),
      },
      { serializeFunctions: true },
    );

    return res.json(resultModel({ data: head(data) }));
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};
