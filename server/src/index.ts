import * as dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import * as express from 'express';
import { AppDataSource } from './data-source';
import productRoutes from './routes/productRoutes';

const app = express();
const PORT = process.env.PORT || 3100;

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/v1/', productRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('TypeORM connection error: ', error));
