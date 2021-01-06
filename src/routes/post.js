import { Router } from 'express';
import PostController from '../controllers/post';
import authenticate from '../utils/jwt';

const router = new Router();

router
  .route('/posts/create')
  .post(authenticate, PostController.createPost);

router
  .route('/posts')
  .get(authenticate, PostController.getAllPosts);

router
  .route('/posts/:id/edit')
  .patch(authenticate, PostController.editPost);

router
  .route('/posts/:id/delete')
  .delete(authenticate, PostController.deletePost);

export default router;
