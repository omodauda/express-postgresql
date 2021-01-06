import { Router } from 'express';
import userRoutes from './user';
import postRoutes from './post';

const router = new Router();

router.use('/', userRoutes);
router.use('/', postRoutes);

export default router;
