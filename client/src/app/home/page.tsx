import { Metadata } from "next";
import Presentation from '../../components/Presentation/index';
import Mision from "@/components/Mision";
import Servicios from "@/components/Servicios";
import NewsLatterBox from "@/components/Contact/SubscriptionBox";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Inicio | Construcciones Menores",
  description: "Pagina de inicio de Construcciones Menores",
};

export default function Home() {
  
  return (
    <>
      <Presentation />
      <Mision />
      <Servicios />
      <NewsLatterBox />
      <Contact />
    </>
  );
}
