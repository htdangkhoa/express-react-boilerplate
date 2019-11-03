import { Router } from 'express';
import auth from './auth';
import generic from './generic';

const router = Router();

router.use('/auth', auth);

router.use('/', generic);

export default router;
