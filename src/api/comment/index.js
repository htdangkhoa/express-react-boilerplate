/* @flow */
import { Router } from 'express';
import { getCommentsController, postCommentController } from './controller';

const router = Router();

router.get('/get-comments/:_id', getCommentsController());

router.post('/post-comment', postCommentController());

export default router;
