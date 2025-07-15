import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './entity/Product';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'products_db',
  synchronize: true, // set to false in production
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: [],
});
