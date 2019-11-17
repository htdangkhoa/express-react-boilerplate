import { Router } from 'express';
import { getPostsController } from './controller';

const router = Router();

router.all('/posts', getPostsController());

export default router;
