import express from 'express';
import apiRouter from './infrastructure/routes';

const startServer = async () => {
  const app = express();
  app.use(express.json());

  app.use('/', apiRouter);

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
};

void startServer();
