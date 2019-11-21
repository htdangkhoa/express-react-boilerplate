/* @flow */
import { Router } from 'express';
import { postCommentController } from './controller';

const router = Router();

router.post('/post', postCommentController());

export default router;
