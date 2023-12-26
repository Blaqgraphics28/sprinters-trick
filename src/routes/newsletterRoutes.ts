import { Router } from 'express';
import { subscribe  } from 'src/controllers/newsletterController';

const router = Router();

router.post('/subscribe', subscribe);

export default router;