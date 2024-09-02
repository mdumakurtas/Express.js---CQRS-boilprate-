import { Router } from 'express';
import { ProductController } from '../controllers';

const router = Router();
const productController = new ProductController();

router.get('/', productController.getAll);
router.post('/', productController.create);
router.post('/:idProduct/restock', productController.restock);
router.post('/:idProduct/sell', productController.sell);

export default router;
