import React, { useEffect, useState } from "react";
import { useModal } from "../Common/ContextModal"; // Asegúrate de que este path sea correcto
import ViewOrderModal from "../Common/ViewOrderModal"; // Asegúrate de que este path sea correcto
import { Pedido } from "@/types/interfaces";

interface UpdatedOrders extends Pedido {
  userName: string;
  serviceName: string;
}

interface OrderTableProps {
  orders: Pedido[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  const { isVisible, modalData, closeModal, openModal } = useModal();
  const [loadedOrders, setLoadedOrders] = useState<UpdatedOrders[]>([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const updatedOrders = await Promise.all(
          orders.map(async (order) => {
            const userResponse = await fetch(
              `http://localhost:1338/admin/user/`,
              {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: order.user_id }),
              }
            );
            if (!userResponse.ok)
              throw new Error("Error al obtener el nombre del usuario");
            const userData = await userResponse.json();
            const userName = userData.name;

            const serviceResponse = await fetch(
              `http://localhost:1338/admin/service/`,
              {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_servicio: order.id_servicio }),
              }
            );
            if (!serviceResponse.ok)
              throw new Error("Error al obtener el nombre del servicio");
            const serviceData = await serviceResponse.json();
            const serviceName = serviceData.nombre;

            return {
              ...order,
              userName,
              serviceName,
            };
          })
        );
        setLoadedOrders(updatedOrders);
      } catch (error) {
        console.error("Error al obtener detalles de los pedidos:", error);
      }
    };

    fetchOrderDetails();
  }, [orders]);

  const handleRowClick = (order: UpdatedOrders) => {
    openModal({
      ...order,
      id: order.id,
      id_servicio: order.id_servicio,
    });
  };

  return (
    <div className="overflow-x-auto rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <table className="min-w-full divide-y divide-gray-200 rounded-2xl overflow-hidden">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th>ID</th>
            <th>Servicio</th>
            <th>Nombre del Cliente</th>
            <th>Número de Teléfono</th>
            <th>Municipio</th>
            <th>Dirección/Referencia</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-dark divide-y divide-gray-200">
          {loadedOrders.map((order) => (
            <tr
              key={order.id}
              className="cursor-pointer"
              onClick={() => handleRowClick(order)}
            >
              <td>{order.id}</td>
              <td>{order.serviceName}</td>
              <td>{order.userName}</td>
              <td>{order.phone}</td>
              <td>{order.municipio}</td>
              <td>{order.address_reference}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isVisible && (
        <ViewOrderModal
          visible={isVisible}
          orderData={modalData}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default OrderTable;
