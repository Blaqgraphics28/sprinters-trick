// export default router

import { Router } from 'express';
import suscribe from '../controllers/GetInTouchControllers';

const router = Router();

router.post('/suscribe', suscribe);

export default router;

