import BreadcrumbDS from "@/components/Common/BreadcrumbDS";
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
    </>
  );
};

export default Product;
