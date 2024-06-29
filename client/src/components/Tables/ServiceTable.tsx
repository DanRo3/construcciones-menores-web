import React, { useState } from "react";
import { Servicio } from "@/types/interfaces";
import { FaEdit, FaTrash } from "react-icons/fa";
import CreateButton from "./CreateButton";
import { useModal } from "../Common/ContextModal";
import { Modal } from "antd";
import EditServiceModal from "../Common/EditarModal";
import { GrFormAdd } from "react-icons/gr";
import CreateServiceModal from "../Common/CreateServiceModal";

interface ServiceTableProps {
  services: Servicio[];
}

const ServiceTable: React.FC<ServiceTableProps> = ({ services }) => {
  const { isVisible, modalData, closeModal } = useModal();
  const [selectedService, setSelectedService] = useState<Servicio>({
    url: "",
    title: "",
    price: 0,
    description: "",
    id: -0,
  });
  const [editingService, setEditingService] = useState<Servicio | null>(null);
  const { openModal } = useModal();
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleRowClick = (service: Servicio) => {
    setSelectedService(service);
  };

  const handleDeleteService = (productId: number) => {
    console.log(`Eliminar producto con ID: ${productId}`);
  };

  const handleEditService = (service: Servicio) => {
    closeModal();
    setEditingService(service);
  };

  const handleSaveEditedService = (updatedService: Servicio) => {
    console.log("Servicio actualizado:", updatedService);
    closeModal();
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
              Nombre
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
              Descripción
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-dark divide-y divide-gray-200">
          {services.map((service) => (
            <tr
              key={service.id}
              className="hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
              onClick={() => {
                handleRowClick(service);
                openModal({ ...service });
              }}
            >
              <td className="px-6 py-4 whitespace-nowrap">{service.id}</td>
              <td className="px-6 py-4 whitespace-nowrap w-32">
                <div className="flex items-center">
                  <div
                    className="flex-shrink-0 w-10 h-10 bg-cover rounded-md"
                    style={{ backgroundImage: `url(${service.url})` }}
                  ></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{service.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{service.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {truncateText(service.description)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="fixed bottom-4 mb-8 ml-5 md:m-7 right-4 bg-green-500 text-white rounded-full p-2 flex items-center justify-center shadow-lg shadow-green-500/50">
        <GrFormAdd size={40} onClick={openCreateModal} />
      </button>
      {isVisible && (
        <Modal
          title="Servicio: "
          visible={isVisible}
          onOk={closeModal}
          onCancel={closeModal}
          centered
          width={800}
          style={{
            zIndex: "9999999",
          }}
          footer={
            <div className="flex space-x-2 mt-5 justify-end">
              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => handleEditService(selectedService)}
              >
                <FaEdit />
              </button>
              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => handleDeleteService(modalData.id || 0)}
              >
                <FaTrash />
              </button>
            </div>
          }
          className="w-[800px]"
        >
          <div className="w-full ">
            <div className="bg-white py-6 sm:py-8 lg:py-12">
              <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="w-full h-full flex md:flex-row flex-col ">
                  <div
                    className="bg-cover rounded-md w-full md:w-2/5 h-[300px]"
                    style={{ backgroundImage: `url(${modalData.url})` }}
                  ></div>

                  <div className="w-full md:w-1/2 md:pl-4">
                    <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:text-left">
                      {modalData.title}
                    </h1>

                    <p className="text-xl text-gray-800">Descripción:</p>

                    <p className="md:mb-9 text-gray-500 sm:text-lg text-pretty overflow-y-auto md:h-2/5">
                      {modalData.description}
                    </p>

                    <div className="flex flex-row text-justify">
                      <p className="text-xl text-gray-800 mb-2">Precio: </p>
                      <p className="text-xl font-semibold text-green-600">
                        {modalData.price}$
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {editingService && (
        <EditServiceModal
          visible={!!editingService}
          onClose={() => setEditingService(null)}
          serviceData={editingService}
          onSave={handleSaveEditedService}
        />
      )}
      {isCreating && (
        <CreateServiceModal
          visible={isCreating}
          onClose={closeCreateModal}
          onSave={(newService) => {
            console.log("Nuevo producto creado:", newService);
            closeModal(); // Cierra el modal después de guardar
          }}
        />
      )}
    </div>
  );
};

function truncateText(text: string): string {
  if (text.length > 40) {
    return `${text.slice(0, 40)}...`;
  }
  return text;
}

export default ServiceTable;
