"use client";
import React, { useEffect, useState } from "react";
import ProductTable from "../Tables/ProductTable";
import { ProductoServer } from "@/types/interfaces"; // Asegúrate de importar los tipos de datos necesarios

const AdminProducts = () => {
  const [productos, setProductos] = useState<ProductoServer[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:1338/admin/productos", {
          method: "GET",
          mode: "cors",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setProductos(data.product);
        } else {
          console.error("Error al obtener los productos:", response.status);
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);
  console.log(productos);
  return (
    <>
      <ProductTable products={productos} />
    </>
  );
};

export default AdminProducts;
