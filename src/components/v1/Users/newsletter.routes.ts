import { Router } from 'express';
import { subscribe  } from './userActions/newsletter';

const router = Router();

router.post('/subscribe', subscribe);


export default Router;