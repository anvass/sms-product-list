import { useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

import type { Product } from '../types/Product';

interface TableProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProductsCount: number;
  rowsLimit: number;
  onPageChange: (page: number) => void;
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

function Table({
  products,
  currentPage,
  totalPages,
  totalProductsCount,
  rowsLimit,
  onPageChange,
  onDelete,
  onEdit,
}: TableProps) {
  const [customPagination, setCustomPagination] = useState<
    Array<number | null>
  >([]);

  useMemo(() => {
    setCustomPagination(new Array(totalPages).fill(null));
  }, []);

  return (
    <div className="my-10">
      <div className="w-full max-w-4xl">
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
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 cursor-pointer"
                        onClick={() => onEdit(product)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                        onClick={() => onDelete(product.id)}
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
        <div className="flex justify-between items-center px-1 py-3">
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
                onClick={() => onPageChange(currentPage - 1)}
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
                  onClick={() => onPageChange(index + 1)}
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
                onClick={() => onPageChange(currentPage + 1)}
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
