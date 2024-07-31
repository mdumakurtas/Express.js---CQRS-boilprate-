import { Router } from 'express';
import { TestController } from '../controllers';

const router = Router();
const testController = new TestController();

router.get('/', testController.getAll);
router.post('/', testController.create);

export default router;
