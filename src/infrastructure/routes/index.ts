import { Router } from 'express';

const router = Router();

// TODO: Move each route to its own file
// example: router.use('/test', testRouter);
router.get('/test', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

export default router;
