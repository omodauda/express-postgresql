import { Router } from 'express';
import UserController from '../controllers/user';
import authenticate from '../utils/jwt';

const router = new Router();

router
  .route('/user/signup')
  .post(UserController.registerUser);

router
  .route('/user/login')
  .post(UserController.login);

router
  .route('/user/profile')
  .get(authenticate, UserController.profile);

router
  .route('/user/delete')
  .delete(authenticate, UserController.deleteUser);

export default router;
