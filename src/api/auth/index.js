import { Router } from 'express';
import {
  registerController,
  loginController,
  renewTokenController,
} from './controller';

const router = Router();

router.post('/register', registerController());

router.post('/login', loginController());

router.post('/renew-token', renewTokenController());

export default router;
