import cors from 'cors';
import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import productRoutes from './routes/productRoutes';
import { seedProducts } from './lib/seed';

const app = express();
const PORT = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());
app.use('/api/v1/', productRoutes);

AppDataSource.initialize()
  .then(async () => {
    console.log(`Seeding..`);
    await seedProducts();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('TypeORM connection error: ', error));
