import Breadcrumb from "@/components/Common/Breadcrumb";
import Servicios from "@/components/Servicios";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Servicios | Construcciones Menores",
    description: "Esta es la página de servicios de la empresa Construcciones Menores",
    // other metadata
};

const ServicesPage = () => {
  return (
    <div>
      <Breadcrumb
        pageName="Página de servicios"
        description="Página para dar a conocer los servicios de la empresa"
      />
      <Servicios />
    </div>
  )
}

export default ServicesPage;
