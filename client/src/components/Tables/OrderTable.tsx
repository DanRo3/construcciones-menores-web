import React, { useState } from "react";
import { useModal } from "../Common/ContextModal";
import ViewOrderModal from "../Common/ViewOrderModal";
import { Pedido } from "@/types/interfaces";

interface OrderTableProps {
  orders: Pedido[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  const { isVisible, modalData, closeModal, openModal } = useModal();
  const [loadedOrders, setLoadedOrders] = useState<Pedido[]>(orders);

  return (
    <div className="overflow-x-auto rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <table className="min-w-full divide-y divide-gray-200 rounded-2xl overflow-hidden">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th>Número de Teléfono</th>
            <th>Municipio</th>
            <th>Dirección/Referencia</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Culminación</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-dark divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="cursor-pointer">
              <td>{order.phone}</td>
              <td>{order.municipio}</td>
              <td>{order.address_reference}</td>
              <td>{new Date(order.fecha_inicio).toLocaleDateString()}</td>
              <td>{new Date(order.fecha_culminacion).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isVisible && (
        <ViewOrderModal
          visible={isVisible}
          orderData={orders}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default OrderTable;
