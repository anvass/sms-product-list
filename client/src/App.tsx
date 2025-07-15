import { useEffect, useState } from 'react';
import ProductTable from './components/ProductTable';
import type { Product, ProductFormData } from './types';
import { api } from './services/api';
import ProductForm from './components/ProductForm';
import { ROWS_LIMIT } from './constants';

function App() {
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
      fetchProducts(1);
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
      await api.deleteProduct(id);
      // fetchProducts(currentPage);
      fetchProducts(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
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
      setError(err instanceof Error ? err.message : 'Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  return (
    <>
      <div className="p-5 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Управление товарами
        </h1>
        <div className="flex justify-between items-center my-10">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            Добавить товар
          </button>
        </div>

        {showForm ? (
          <ProductForm
            product={editingProduct}
            onSubmit={
              editingProduct ? handleUpdateProduct : handleCreateProduct
            }
            onCancel={handleCancelForm}
            isLoading={isLoading}
          />
        ) : (
          <ProductTable
            products={products}
            currentPage={currentPage}
            totalPages={totalPages}
            totalProductsCount={totalProductsCount}
            rowsLimit={rowsLimit}
            onPageChange={handlePageChange}
            onDelete={handleDeleteProduct}
            onEdit={handleEditProduct}
          />
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-1">
            {error}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
