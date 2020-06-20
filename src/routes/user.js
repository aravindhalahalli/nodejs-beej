// Mini ExpressJS Application
import { Router } from 'express';
import { createUser, getAllUsers } from '@controllers/user';

const router = Router();

router.post('/add-user', createUser);
router.get('/all', getAllUsers);

export { router as default };
