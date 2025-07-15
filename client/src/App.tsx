import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import useProducts from './hooks/useProducts';

function App() {
  const {
    showForm,
    setShowForm,
    editingProduct,
    handleUpdateProduct,
    handleCreateProduct,
    handleCancelForm,
    handlePageChange,
    handleDeleteProduct,
    handleEditProduct,
    isLoading,
    products,
    currentPage,
    totalPages,
    totalProductsCount,
    rowsLimit,
    error,
  } = useProducts();

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
