import React from "react";
import { Producto } from "@/types/interfaces";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import CreateButton from "./CreateButton";

interface ProductTableProps {
  products: Producto[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const handleDeleteProduct = (productId: number) => {
    console.log(`Eliminar producto con ID: ${productId}`);
  };

  const handleEditProduct = (productId: number) => {
    console.log(`Editar producto con ID: ${productId}`);
  };

  return (
    <div className="overflow-x-auto rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <table className="min-w-full divide-y divide-gray-200 rounded-2xl overflow-hidden">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white w-24"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white w-32"
            >
              Imagen
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white w-48"
            >
              Título
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
            >
              Precio
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-dark divide-y divide-gray-200">
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-gray-100 dark:hover:bg-slate-600"
            >
              <td className="px-6 py-4 whitespace-nowrap w-24">{product.id}</td>
              <td className="px-6 py-4 whitespace-nowrap w-32">
                <div className="flex items-center">
                  <div
                    className="flex-shrink-0 w-10 h-10 bg-cover rounded-md"
                    style={{ backgroundImage: `url(${product.url})` }}
                  ></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap w-48">
                {product.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CreateButton />
    </div>
  );
};

export default ProductTable;
