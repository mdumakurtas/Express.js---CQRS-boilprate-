import { Router } from 'express';
import { Test } from '../../domain/entities';
import dataSource from '../../config/data-source';

const router = Router();
const testRepository = dataSource.getRepository(Test);

router.get('/', async (req, res) => {
  // TODO: Move this logic to Query Handlers
  const result = await testRepository.find();

  res.json(result);
});

router.post('/', async (req, res) => {
  // TODO: Move this logic to Command Handlers
  const test = new Test();
  test.name = 'Some test document';

  const result = await testRepository.save(test);

  res.json(result);
});

export default router;
