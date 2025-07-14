import { useState, useMemo } from 'react';
import products from '../../products.json';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Table() {
  const [productList] = useState(products);
  const [rowsLimit] = useState(10);
  const [rowsToShow, setRowsToShow] = useState(productList.slice(0, rowsLimit));
  const [customPagination, setCustomPagination] = useState([]);
  const [totalPage] = useState(Math.ceil(productList?.length / rowsLimit));
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = products.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };

  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = products.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };

  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = products.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };

  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(productList?.length / rowsLimit)).fill(null)
    );
  }, []);

  return (
    <div className="min-h-screen h-full bg-white flex  items-center justify-center pt-10 pb-14">
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
              {rowsToShow?.map((data, index) => (
                <tr
                  className="hover:bg-slate-50 border-b border-slate-200"
                  key={index}
                >
                  <td className="p-4 py-5">
                    <p className="block font-semibold text-sm text-slate-800">
                      {data?.id}
                    </p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="text-sm text-slate-500">{data?.name}</p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="text-sm text-slate-500">{data?.article}</p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="text-sm text-slate-500">{data?.price}</p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="text-sm text-slate-500">{data?.quantity}</p>
                  </td>
                  <td className="p-4 py-5">
                    <div className="flex">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        //   onClick={() => onDelete(product.id)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        //   onClick={() => onEdit(product.id)}
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
            Показано {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} -{' '}
            {currentPage == totalPage - 1
              ? productList?.length
              : (currentPage + 1) * rowsLimit}{' '}
            из {productList?.length}
          </div>
          <div className="flex">
            <ul
              className="flex space-x-1"
              role="navigation"
              aria-label="Pagination"
            >
              <li
                className={` prev-btn flex items-center justify-center px-3 py-1 min-w-9 min-h-9 text-sm font-normal border rounded  border-slate-200 hover:bg-slate-50 hover:border-slate-400 ${
                  currentPage == 0
                    ? ' bg-[#cccccc] text-slate-500 pointer-events-none'
                    : ' bg-white text-black cursor-pointer'
                }
    `}
                onClick={previousPage}
              >
                <FaChevronLeft />
              </li>
              {customPagination?.map((data, index) => (
                <li
                  className={`flex items-center justify-center px-3 py-1 min-w-9 min-h-9 text-sm font-normal bg-white border rounded cursor-pointer ${
                    currentPage == index
                      ? 'text-blue-500  border-blue-200 hover:bg-blue-50 hover:border-blue-400 '
                      : 'text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-400 '
                  }`}
                  onClick={() => changePage(index)}
                  key={index}
                >
                  {index + 1}
                </li>
              ))}
              <li
                className={`flex items-center justify-center px-3 py-1 min-w-9 min-h-9 text-sm font-normal border rounded  border-slate-200 hover:bg-slate-50 hover:border-slate-400 ${
                  currentPage == totalPage - 1
                    ? ' bg-[#cccccc] text-slate-500 pointer-events-none'
                    : ' bg-white text-black cursor-pointer'
                }`}
                onClick={nextPage}
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
