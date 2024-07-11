import React, { useState } from "react";
import { ProductoServer } from "@/types/interfaces"; // Asegúrate de importar los tipos de datos necesarios
import { FaEdit, FaTrash } from "react-icons/fa";
import CreateButton from "./CreateButton";
import { useModal } from "../Common/ContextModal";
import { Modal } from "antd";
import EditProductModal from "../Common/EditProductModal";
import CreateProductModal from "../Common/CreateProductoModal";
import { GrFormAdd } from "react-icons/gr";

interface ProductTableProps {
  products: ProductoServer[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const { isVisible, modalData, closeModal, openModal } = useModal();
  const [selectedProduct, setSelectedProduct] = useState<ProductoServer | null>(
    null
  );
  const [editingProduct, setEditingProduct] = useState<ProductoServer | null>(
    null
  );
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleDeleteProduct = (productId: number) => {
    console.log(`Eliminar producto con ID: ${productId}`);
  };

  const handleEditProduct = (product: ProductoServer) => {
    closeModal();
    setEditingProduct(product);
  };

  const handleSaveEditedProduct = (updatedProduct: ProductoServer) => {
    console.log("Producto actualizado:", updatedProduct);
    closeModal();
  };

  const handleRowClick = (product: ProductoServer) => {
    setSelectedProduct(product);
    openModal(product);
  };

  const openCreateModal = () => {
    setIsCreating(true);
  };

  const closeCreateModal = () => {
    setIsCreating(false);
  };

  return (
    <div className="overflow-x-auto rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <table className="min-w-full divide-y divide-gray-200 rounded-2xl overflow-hidden">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
            >
              Imagen
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
            >
              Título
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
            >
              Precio
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-dark divide-y divide-gray-200">
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
              onClick={() => handleRowClick(product)}
            >
              <td className="whitespace-nowrap px-6 py-4">{product.id}</td>
              <td className="px-6 py-4 whitespace-nowrap w-32">
                <div className="flex items-center">
                  <div
                    className="flex-shrink-0 w-10 h-10 bg-cover rounded-md"
                    style={{ backgroundImage: `url(${product.imgpath})` }}
                  ></div>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">{product.name}</td>
              <td className="whitespace-nowrap px-6 py-4">{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="fixed bottom-4 mb-8 ml-5 md:m-7 right-4 bg-green-500 text-white rounded-full p-2 flex items-center justify-center shadow-lg shadow-green-500/50">
        <GrFormAdd size={40} onClick={openCreateModal} />
      </button>
      {isVisible && (
        <Modal
          title="Producto: "
          visible={isVisible}
          onOk={closeModal}
          onCancel={closeModal}
          centered
          style={{
            zIndex: "9999999",
          }}
          footer={
            <div className="flex space-x-2 mt-5 justify-end">
              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => handleEditProduct(selectedProduct!)}
              >
                <FaEdit />
              </button>
              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => handleDeleteProduct(modalData.id || 0)}
              >
                <FaTrash />
              </button>
            </div>
          }
        >
          <div className="flex flex-row items-center">
            <div
              className="w-32 h-32 bg-cover bg-center rounded-md overflow-hidden"
              style={{ backgroundImage: `url(${modalData.imgpath || ""})` }}
            ></div>
            <div className="w-full md:w-1/2 md:pl-4 flex justify-between flex-col">
              <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:text-left">
                {modalData.name}
              </h1>

              <div className="flex flex-row text-justify">
                <p className="text-xl text-gray-800 mb-2">Precio: </p>
                <p className="text-xl font-semibold text-green-600">
                  {modalData.price}$
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {editingProduct && (
        <EditProductModal
          visible={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          productData={editingProduct}
          onSave={handleSaveEditedProduct}
        />
      )}
      {isCreating && (
        <CreateProductModal
          visible={isCreating}
          onClose={closeCreateModal}
          onSave={(newProduct) => {
            console.log("Nuevo producto creado:", newProduct);
            closeModal(); // Cierra el modal después de guardar
          }}
        />
      )}
    </div>
  );
};

export default ProductTable;
