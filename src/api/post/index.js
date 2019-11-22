import { Router } from 'express';
import {
  getPostsController,
  createPostController,
  getPostDetailController,
} from './controller';

const router = Router();

router.all('/newest', getPostsController());

router.all('/detail/:_id', getPostDetailController());

router.post('/create-post', createPostController());

export default router;
