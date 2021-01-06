import { Router } from 'express';
import PostController from '../controllers/post';
import authenticate from '../utils/jwt';

const router = new Router();

router
  .route('/post/create')
  .post(authenticate, PostController.createPost);

export default router;
