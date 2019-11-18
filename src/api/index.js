import { Router } from 'express';
import auth from './auth';
import generic from './generic';
import post from './post';

const router = Router();

router.use('/auth', auth);

router.use('/post', post);

router.use('/', [generic]);

export default router;
