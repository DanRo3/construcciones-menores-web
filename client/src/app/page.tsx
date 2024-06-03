import { Metadata } from "next";
import Presentation from './../components/Presentation/index';
import Mision from "@/components/Mision";

export const metadata: Metadata = {
  title: "Inicio | Construcciones Menores",
  description: "Pagina de inicio de Construcciones Menores",
};

export default function Home() {
  
  return (
    <>
      <Presentation />
      <Mision />
    </>
  );
}
