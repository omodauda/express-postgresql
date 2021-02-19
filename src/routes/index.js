import { Router } from 'express';
import userRoutes from './user';
import postRoutes from './post';
import commentRoutes from './comment';

const router = new Router();

router.use('/', userRoutes);
router.use('/', postRoutes);
router.use('/', commentRoutes);

export default router;
