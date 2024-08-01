import { DataSource } from 'typeorm';
import { Order, Product } from '../domain/entities';

export const dataSource = new DataSource({
  type: 'mongodb',
  host: process.env.MONGO_DB_HOST,
  port: Number(process.env.MONGO_DB_PORT),
  database: process.env.MONGO_DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Product, Order],
  useUnifiedTopology: true,
});
