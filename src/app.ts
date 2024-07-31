import express from 'express';
import apiRouter from './infrastructure/routes';
import dataSource from './config/data-source';

const startServer = async () => {
  const app = express();
  app.use(express.json());

  app.use('/', apiRouter);

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
};

const startDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await dataSource.initialize();
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database');
    throw error;
  }
};

const startApp = async () => {
  try {
    await startDatabase();
    await startServer();
  } catch (error) {
    console.error('Failed to start application', error);
    process.exit(1);
  }
};

void startApp();
