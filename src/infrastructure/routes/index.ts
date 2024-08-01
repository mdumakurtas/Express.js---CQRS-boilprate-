import { Router } from 'express';
import productRoute from './product.route';
import orderRoute from './order.route';

const router = Router();

router.use('/product', productRoute);
router.use('/order', orderRoute);

export default router;
