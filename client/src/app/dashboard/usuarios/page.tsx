import BreadcrumbDS from "@/components/Common/BreadcrumbDS";
import AdminUsers from "@/components/Dashboard/AdminUsers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestionar usuarios | Construcciones Menores",
  description:
    "Esta es la página de administración de usuarios de la empresa Construcciones Menores",
  // other metadata
};

const Users = () => {
  return (
    <>
      <BreadcrumbDS pageName="Usuarios" />
      <AdminUsers />
    </>
  );
};

export default Users;
