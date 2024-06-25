import BreadcrumbDS from "@/components/Common/BreadcrumbDS";
import AdminPedidos from "@/components/Dashboard/AdminPedidos";
import TableCrud from "@/components/Tables/TableCrud";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedidos | Construcciones Menores",
  description:
    "Esta es la página de administración de la empresa Construcciones Menores",
  // other metadata
};

const Pedidos = () => {
  return (
    <>
      <BreadcrumbDS pageName="Pedidos" />
      <AdminPedidos />
    </>
  );
};

export default Pedidos;
