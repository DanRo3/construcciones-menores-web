import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";
import "@/styles/satoshi.css";
import "@/styles/index.css";
import ECommerce from "@/components/Dashboard/E-commerce";


export const metadata: Metadata = {
  title: "Dashboard | Construcciones Menores",
  description: "Pagina de inicio de Construcciones Menores",
};

export default function Dashboard() {
  
  return (
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
  );
}
