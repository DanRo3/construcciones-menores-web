"use client";
import { useEffect, useState } from "react";
import OrderTable from "../Tables/OrderTable";
import { Pedido } from "@/types/interfaces";

const AdminPedidos = () => {
  const [orders, setOrders] = useState<Pedido[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:1338/admin/pedidos", {
          method: "GET",
          credentials: "include",
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("No se pudieron cargar los pedidos.");
        }
        const data = await response.json();
        setOrders(data.pedidos);
        console.log(data.pedidos);
      } catch (error) {
        setError("Error al obtener los pedidos: ");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // if (loading) {
  //   return <p>Cargando pedidos...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  return <OrderTable orders={orders} />;
};

export default AdminPedidos;
