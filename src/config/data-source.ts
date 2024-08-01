import { DataSource } from 'typeorm';
import { Product, Test } from '../domain/entities';

export const dataSource = new DataSource({
  type: 'mongodb',
  host: process.env.MONGO_DB_HOST,
  port: Number(process.env.MONGO_DB_PORT),
  database: process.env.MONGO_DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Test, Product],
  useUnifiedTopology: true,
});
