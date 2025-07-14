import type { ProductsResponse } from '../types/Product';

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
};
