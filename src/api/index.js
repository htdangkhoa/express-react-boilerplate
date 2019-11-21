import { Router } from 'express';
import auth from './auth';
import generic from './generic';
import post from './post';
import comment from './comment';

const router = Router();

router.use('/auth', auth);

router.use('/post', post);

router.use('/comment', comment);

router.use('/', [generic]);

export default router;
