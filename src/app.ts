import 'express-async-errors';
import express from 'express';
import apiRouter from './infrastructure/routes';
import { dataSource } from './config';
import { errorHttpHandler } from './infrastructure/middleware';
import { logError, logInfo } from './application/utils';
import { notFoundRoute } from './infrastructure/middleware/not-found-route';

const startDatabase = async () => {
  try {
    logInfo('Connecting to database...');
    await dataSource.initialize();
    logInfo('Connected to database');
  } catch (error) {
    logError('Error connecting to database');
    throw error;
  }
};

const startServer = async () => {
  const app = express();
  app.use(express.json());

  app.use('/', apiRouter);
  app.use('*', notFoundRoute);

  app.use(errorHttpHandler);

  app.listen(3000, () => {
    logInfo('Server is running on port 3000');
  });
};

const startApp = async () => {
  try {
    await startDatabase();
    await startServer();
  } catch (error) {
    logError('Failed to start application', error);
    process.exit(1);
  }
};

void startApp();
