import { Router } from 'express';
import CommentController from '../controllers/comment';
import authenticate from '../utils/jwt';

const router = new Router();

router
  .route('/comments/create')
  .post(authenticate, CommentController.createComment);

export default router;
