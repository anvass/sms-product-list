// import { useState, useMemo } from 'react';
// import products from '../../products.json';
import { useEffect, useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { api } from '../services/api';
import type { Product } from '../types/Product';

function Table() {
  const [rowsLimit] = useState<number>(50);
  const [customPagination, setCustomPagination] = useState<
    Array<number | null>
  >([]);

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProductsCount, setTotalProductsCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useMemo(() => {
    setCustomPagination(Array(Math.ceil(totalPages)).fill(null));
  }, []);

  const fetchProducts = async (page: number = 1) => {
    try {
      // setIsLoading(true);
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
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageChange = (page: number) => {
    fetchProducts(page);
  };

  return (
    <div className="min-h-screen h-full bg-white flex flex-col items-center justify-center pt-10 pb-14">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="w-full max-w-4xl px-2">
        <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter ">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none text-slate-500">
                    ID
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none text-slate-500">
                    Название
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none text-slate-500">
                    Артикул
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none text-slate-500">
                    Цена
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none text-slate-500">
                    Количество
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none text-slate-500">
                    Действия
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => (
                <tr
                  className="hover:bg-slate-50 border-b border-slate-200"
                  key={index}
                >
                  <td className="p-4 py-5">
                    <p className="block font-semibold text-sm text-slate-800">
                      {product?.id}
                    </p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="text-sm text-slate-500">{product?.name}</p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="text-sm text-slate-500">{product?.article}</p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="text-sm text-slate-500">{product?.price}</p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="text-sm text-slate-500">
                      {product?.quantity}
                    </p>
                  </td>
                  <td className="p-4 py-5">
                    <div className="flex">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                        <MdEdit />
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        //   onClick={() => handleDeleteProduct(product.id)}
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-sm text-slate-500">
            Показано {currentPage == 1 ? 1 : currentPage * rowsLimit} -{' '}
            {currentPage == totalPages
              ? totalProductsCount
              : currentPage * rowsLimit}{' '}
            из {totalProductsCount}
          </div>
          <div className="flex">
            <ul
              className="flex space-x-1"
              role="navigation"
              aria-label="Pagination"
            >
              <li
                className={` prev-btn flex items-center justify-center px-3 py-1 min-w-9 min-h-9 text-sm font-normal border rounded  border-slate-200 hover:bg-slate-50 hover:border-slate-400 ${
                  currentPage == 1
                    ? ' bg-[#cccccc] text-slate-500 pointer-events-none'
                    : ' bg-white text-black cursor-pointer'
                }
    `}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <FaChevronLeft />
              </li>
              {customPagination?.map((data, index) => (
                <li
                  className={`flex items-center justify-center px-3 py-1 min-w-9 min-h-9 text-sm font-normal bg-white border rounded cursor-pointer ${
                    currentPage == index + 1
                      ? 'text-blue-500  border-blue-200 hover:bg-blue-50 hover:border-blue-400 '
                      : 'text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-400 '
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                  key={index}
                >
                  {index + 1}
                </li>
              ))}
              <li
                className={`flex items-center justify-center px-3 py-1 min-w-9 min-h-9 text-sm font-normal border rounded  border-slate-200 hover:bg-slate-50 hover:border-slate-400 ${
                  currentPage == totalPages
                    ? ' bg-[#cccccc] text-slate-500 pointer-events-none'
                    : ' bg-white text-black cursor-pointer'
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <FaChevronRight />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
