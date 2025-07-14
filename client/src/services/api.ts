import type {
  CreateProductRequest,
  Product,
  ProductsResponse,
} from '../types/Product';

export const api = {
  async getProducts(
    page: number = 1,
    limit: number = 10
  ): Promise<ProductsResponse> {
    const response = await fetch(
      `${import.meta.env.VITE_API}/products?page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error('Ошибка при загрузке продуктов');
    }
    return response.json();
  },

  async createProduct(product: CreateProductRequest): Promise<Product> {
    const response = await fetch(`${import.meta.env.VITE_API}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Ошибка при создании продукта');
    }

    return response.json();
  },
};
