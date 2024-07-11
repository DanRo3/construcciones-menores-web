import HomeAnimated from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio | Construcciones Menores",
  description: "Pagina de inicio de Construcciones Menores",
};

export default function Home() {
  return (
    <>
      <HomeAnimated />
    </>
  );
}
