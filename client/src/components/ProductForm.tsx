import { useForm } from 'react-hook-form';
import type { Product, ProductFormData } from '../types';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

function ProductForm({
  product,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProductFormProps) {
  const form = useForm<ProductFormData>({
    defaultValues: {
      ...product,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="my-10 w-full max-w-3xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 p-5 bg-white rounded-lg shadow-md"
      >
        <h2 className="mb-3 text-xl font-bold text-gray-900 text-center">
          {product ? 'Обновление товара' : 'Добавление товара'}
        </h2>
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Название
          </label>
          <input
            id="name"
            {...register('name', {
              required: 'Это поле обязательно',
            })}
            className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500 animate-fade-in">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="article"
            className="block text-sm font-medium text-gray-700"
          >
            Артикул
          </label>
          <input
            id="article"
            {...register('article', {
              required: 'Это поле обязательно',
            })}
            className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.article ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.article && (
            <p className="mt-1 text-sm text-red-500 animate-fade-in">
              {errors.article.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Цена
          </label>
          <input
            id="price"
            type="number"
            step="1"
            {...register('price', {
              required: 'Это поле обязательно',
              valueAsNumber: true,
              min: {
                value: 1,
                message: 'Цена должна быть больше 0',
              },
            })}
            className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-500 animate-fade-in">
              {errors.price.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Количество
          </label>
          <input
            id="quantity"
            type="number"
            {...register('quantity', {
              required: 'Это поле обязательно',
              valueAsNumber: true,
              min: {
                value: 0,
                message: 'Количество не может быть отрицательным',
              },
            })}
            className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.quantity ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-500 animate-fade-in">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? 'Сохранение...' : product ? 'Обновить' : 'Добавить'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 cursor-pointer"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
