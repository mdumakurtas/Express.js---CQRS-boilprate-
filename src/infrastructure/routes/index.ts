import { Router } from 'express';
import testRoute from './test.route';
import productRoute from './product.route';
import orderRoute from './order.route';

const router = Router();

router.use('/test', testRoute);
router.use('/product', productRoute);
router.use('/order', orderRoute);

export default router;
