import Breadcrumb from "@/components/Common/Breadcrumb";
import Mision from "@/components/Mision";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mision | Construcciones Menores",
  description:
    "Esta es la página de informacion sobre la empresa Construcciones Menores",
  // other metadata
};
const MisionPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Mision y vision"
        description="Conoce nuestros principios como empresa"
        direction="/home"
      />
      <Mision />
    </>
  );
};

export default MisionPage;
