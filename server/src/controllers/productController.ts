import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Product } from '../entity/Product';

const productRepository = AppDataSource.getRepository(Product);

export const getProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const [data, total] = await productRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: { id: 'ASC' },
  });
  res.json({ data, total });
};

//   const { article, name, price, quantity } = req.body;
//   const product = productRepository.create({ article, name, price, quantity });
//   // const errors = await validate(product);
//   // if (errors.length > 0) {
//   //   return res.status(400).json(errors);
//   // }
//   try {
//     await productRepository.save(product);
//     res.status(201).json(product);
//   } catch (err: any) {
//     // if (err.code === '23505') { // unique violation
//     //   return res.status(400).json({ message: 'Article must be unique' });
//     // }
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // export const updateProduct = async (req: Request, res: Response) => {
// //   const id = parseInt(req.params.id);
// //   const product = await productRepository.findOneBy({ id });
// //   if (!product) {
// //     return res.status(404).json({ message: 'Product not found' });
// //   }
// //   productRepository.merge(product, req.body);
// //   const errors = await validate(product);
// //   if (errors.length > 0) {
// //     return res.status(400).json(errors);
// //   }
// //   try {
// //     await productRepository.save(product);
// //     res.json(product);
// //   } catch (err: any) {
// //     if (err.code === '23505') {
// //       return res.status(400).json({ message: 'Article must be unique' });
// //     }
// //     res.status(500).json({ message: 'Server error', error: err.message });
// //   }
// // };

// export const deleteProduct = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   const result = await productRepository.delete(id);
//   if (result.affected === 0) {
//     return res.status(404).json({ message: 'Product not found' });
//   }
//   res.status(204).send();
// };
