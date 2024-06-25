import Breadcrumb from "@/components/Common/Breadcrumb";
import Products from "@/components/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productos | Construcciones Menores",
  description:
    "Esta es la página de productos de la empresa Construcciones Menores",
  // other metadata
};

const ProductPage = () => {
  return (
    <div>
      <Breadcrumb
        pageName="Página de productos"
        description="Conoce los productos que ofrece la empresa"
        direction="/home"
      />
      <Products />
    </div>
  );
};

export default ProductPage;
