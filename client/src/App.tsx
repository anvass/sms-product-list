import { useEffect, useState } from 'react';
import Table from './components/ProductTable';
import type { CreateProductRequest, Product } from './types/Product';
import { api } from './services/api';
import ProductForm from './components/ProductForm';

function App() {
  const [rowsLimit] = useState<number>(50);
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
        err instanceof Error ? err.message : 'Ошибка при получении продуктов'
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

  const handleCreateProduct = async (productData: CreateProductRequest) => {
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
      fetchProducts(currentPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="p-5">
        <h1 className="text-2xl font-bold text-gray-900">
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {showForm ? (
          <div className="mb-8">
            <ProductForm
              product={editingProduct}
              onSubmit={
                // editingProduct ? handleUpdateProduct : handleCreateProduct
                handleCreateProduct
              }
              onCancel={handleCancelForm}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <Table
            products={products}
            currentPage={currentPage}
            totalPages={totalPages}
            totalProductsCount={totalProductsCount}
            rowsLimit={rowsLimit}
            onPageChange={handlePageChange}
            onDelete={handleDeleteProduct}
          />
        )}
      </div>
    </>
  );
}

export default App;
