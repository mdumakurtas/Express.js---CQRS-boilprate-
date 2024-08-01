import { Router } from 'express';
import testRoute from './test.route';
import productRoute from './product.route';

const router = Router();

router.use('/test', testRoute);
router.use('/product', productRoute);

export default router;
