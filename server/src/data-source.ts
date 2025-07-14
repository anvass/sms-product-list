import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './entity/Product';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'anvass',
  password: '',
  database: 'sms_products',
  synchronize: true,
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: [],
});
