import { useEffect, useState } from 'react';

import type { Product, ProductFormData } from '../types';
import { api } from '../services/api';

const ROWS_LIMIT = 50;

function useProducts() {
  const [rowsLimit] = useState<number>(ROWS_LIMIT);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProductsCount, setTotalProductsCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async (page: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.getProducts(page, rowsLimit);
      setProducts(response.data);
      setTotalProductsCount(response.total);
      setTotalPages(Math.ceil(response.total / rowsLimit));
      setCurrentPage(page);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Ошибка при получении товаров'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageChange = (page: number) => {
    fetchProducts(page);
  };

  const handleCreateProduct = async (productData: ProductFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await api.createProduct(productData);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setError(null);
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await api.deleteProduct(id);
      const newTotalPages = Math.ceil(response.total / rowsLimit);
      const newCurrentPage = Math.min(currentPage, newTotalPages);
      fetchProducts(newCurrentPage);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Ошибка при удалении товара'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (productData: ProductFormData) => {
    if (!editingProduct) return;

    try {
      setIsLoading(true);
      setError(null);
      await api.updateProduct(editingProduct.id, productData);
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts(currentPage);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Ошибка при обновлении продукта'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };
  
  return {
    setShowForm,
    showForm,
    editingProduct,
    handleUpdateProduct,
    handleCreateProduct,
    handleCancelForm,
    isLoading,
    products,
    currentPage,
    totalPages,
    totalProductsCount,
    rowsLimit,
    handlePageChange,
    handleDeleteProduct,
    handleEditProduct,
    error,
  };
}

export default useProducts;
