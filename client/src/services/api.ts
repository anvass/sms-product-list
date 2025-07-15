import type { Product, ProductFormData, ProductsResponse } from '../types';

export const api = {
  async getProducts(
    page: number = 1,
    limit: number = 10
  ): Promise<ProductsResponse> {
    const response = await fetch(
      `${import.meta.env.VITE_API}/products?page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error('Ошибка при загрузке товаров');
    }
    return response.json();
  },

  async createProduct(product: ProductFormData): Promise<Product> {
    const response = await fetch(`${import.meta.env.VITE_API}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Ошибка при создании товара');
    }

    return response.json();
  },

  async deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${import.meta.env.VITE_API}/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Ошибка при удалении товара');
    }
  },

  async updateProduct(id: number, product: ProductFormData): Promise<Product> {
    const response = await fetch(`${import.meta.env.VITE_API}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Ошибка при обновлении товара');
    }

    return response.json();
  },
};
