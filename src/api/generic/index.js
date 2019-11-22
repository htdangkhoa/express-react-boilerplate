import { Router } from 'express';
import { meController } from './controller';

const router = Router();

router.all('/me', meController());

export default router;
