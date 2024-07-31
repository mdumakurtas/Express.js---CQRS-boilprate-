import { Router } from 'express';
import { Test } from '../../domain/entities';
import dataSource from '../../config/data-source';

const router = Router();

// TODO: Move each route to its own file
// example: router.use('/test', testRouter);
router.post('/test', async (req, res) => {
  // TODO: Move this logic to Command/Query Handlers
  const test = new Test();
  test.name = 'Some test document';

  const testRepository = dataSource.getRepository(Test);

  await testRepository.save(test);

  // TODO: Move this logic to Command/Query Handlers
  const result = await testRepository.find();
  console.log('MongoDB result:', result);

  // TODO: Return the result from the handler
  res.json({
    message: 'Hello World',
  });
});

export default router;
