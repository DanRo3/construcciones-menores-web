"use client";
import React, { useState } from "react";
import { Pedido } from "@/types/interfaces";
import { useModal } from "../Common/ContextModal";
import ViewOrderModal from "../Common/ViewOrderModal";

interface OrderTableProps {
  orders: Pedido[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  const { isVisible, modalData, closeModal, openModal } = useModal();

  const handleRowClick = (order: Pedido) => {
    openModal(order);
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
              Servicio
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
            >
              Nombre del Cliente
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
            >
              Número de Teléfono
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
            >
              Municipio
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
            >
              Direccion/Referencia
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-dark divide-y divide-gray-200">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
              onClick={() => handleRowClick(order)}
            >
              <td className="whitespace-nowrap px-6 py-4">{order.id}</td>
              <td className="whitespace-nowrap px-6 py-4">{order.service}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {order.customerName}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {order.phoneNumber}
              </td>
              <td className="whitespace-nowrap px-6 py-4">{order.municipio}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {order.addressDescription}
              </td>
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
