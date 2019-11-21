/* @flow */
import { type Request, type Response } from 'express';
import { ObjectId } from 'mongodb';
import { genericError, success } from 'models/result.model';

// export const getCommentsController = () => async (req: Request, res: Response) => {

// }

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
    await commentsCollection.insertOne({
      post_id: ObjectId(_id),
      user_id: ObjectId(user._id),
      comment,
    });

    return res.json(success());
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};
