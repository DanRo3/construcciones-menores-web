"use client";
import OrderTable from "../Tables/OrderTable";

const AdminPedidos = () => {
  const Orders = [
    {
      id: 1,
      service: "Construcción de Muros",
      customerName: "Juan Pérez",
      phoneNumber: "555-1234",
      addressDescription: "Calle 123, No. 45, Apto. 101",
      municipio: "Marianao",
      dateRange: ["2024-07-01", "2024-07-05"],
    },
    {
      id: 2,
      service: "Construcción de Muros",
      customerName: "María Rodríguez",
      phoneNumber: "555-5678",
      addressDescription: "Carrera 12, No. 34, Apto. 202",
      municipio: "La lisa",
      dateRange: ["2024-07-10", "2024-07-15"],
    },
    {
      id: 3,
      service: "Construcción de Muros",
      customerName: "Carlos Gómez",
      phoneNumber: "555-8765",
      addressDescription: "Avenida Principal, No. 67, Casa 5",
      municipio: "Cerro",
      dateRange: ["2024-07-20", "2024-07-25"],
    },
    {
      id: 4,
      service: "Construcción de Muros",
      customerName: "Ana Martínez",
      phoneNumber: "555-4321",
      addressDescription: "Calle Secundaria, No. 89, Apto. 303",
      municipio: "Centro Habana",
      dateRange: ["2024-07-30", "2024-08-05"],
    },
  ];
  return (
    <>
      <OrderTable orders={Orders} />
    </>
  );
};

export default AdminPedidos;
