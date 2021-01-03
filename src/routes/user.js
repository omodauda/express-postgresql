import { Router } from 'express';
import UserController from '../controllers/user';

const router = new Router();

router
  .route('/user/signup')
  .post(UserController.registerUser);

export default router;
