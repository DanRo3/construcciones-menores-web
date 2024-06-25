import BreadcrumbDS from "@/components/Common/BreadcrumbDS";
import AdminService from "@/components/Dashboard/AdminService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gastionar servicios | Construcciones Menores",
  description:
    "Esta es la página de administración de productos de la empresa Construcciones Menores",
  // other metadata
};

const Service = () => {
  return (
    <>
      <BreadcrumbDS pageName="Servicios" />
      <AdminService />
    </>
  );
};

export default Service;
