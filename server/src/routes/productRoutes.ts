import { Router } from 'express';
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productController';

const router = Router();

router.get('/products', getProducts);
router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);

export default router;
