import { Router } from 'express';
import { login, signup, validToken } from '../controllers/user.contollers.js';
import { userExist } from '../middlewares/userExist.middleware.js';
import { validReq } from '../middlewares/validUserInput.middleware.js';
import { validUser } from '../middlewares/userAuth.middleware.js';

const router = Router();

router.post('/signup', validReq, userExist, signup);
router.post('/login', validReq, login);
router.get('/token', validUser, validToken);

export default router;
