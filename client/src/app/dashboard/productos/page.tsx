import BreadcrumbDS from "@/components/Common/BreadcrumbDS";
import AdminProducts from "@/components/Dashboard/AdminProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gastionar Productos | Construcciones Menores",
  description:
    "Esta es la página de administración de productos de la empresa Construcciones Menores",
  // other metadata
};

const Product = () => {
  return (
    <>
      <BreadcrumbDS pageName="Productos" />
      <AdminProducts />
    </>
  );
};

export default Product;
