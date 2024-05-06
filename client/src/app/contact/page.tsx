import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
    title: "Contacto | Construcciones Menores",
    description: "Esta es la página de contacto de la empresa Construcciones Menores",
    // other metadata
};


const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Página de contacto"
        description="Página para establecer un contacto con la empresa"
      />
      <Contact />
    </>
  )
}

export default ContactPage;
