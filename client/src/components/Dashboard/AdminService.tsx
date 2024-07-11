"use client";

import { ServicioServer } from "@/types/interfaces";
import ServiceTable from "../Tables/ServiceTable";
import { useEffect, useState } from "react";

const AdminService = () => {
  const [services, setServices] = useState<ServicioServer[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:1338/admin/services", {
        method: "GET",
        credentials: "include", // Esto incluirá las cookies en la petición
      });
      const data = await response.json();
      setServices(data.services);
      console.log(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleServiceDeleted = (deletedServiceId: number) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.id_servicio !== deletedServiceId)
    );
  };

  return (
    <>
      <ServiceTable
        services={services}
        onUpdateServices={handleServiceDeleted}
      />
    </>
  );
};

export default AdminService;
