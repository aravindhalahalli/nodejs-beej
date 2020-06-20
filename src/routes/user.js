// Mini ExpressJS Application
import { Router } from 'express';
import { getAllUser } from '../controllers/user';

const router = Router();

router.get('/all', getAllUser);

export { router as default };
