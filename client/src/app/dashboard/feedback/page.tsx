import BreadcrumbDS from "@/components/Common/BreadcrumbDS";
import AdminFeedback from "@/components/Dashboard/AdminFeedback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback | Construcciones Menores",
  description:
    "Esta es la página de administración de feedback de la empresa Construcciones Menores",
  // other metadata
};

const Feedback = () => {
  return (
    <>
      <BreadcrumbDS pageName="Feedback" />
      <AdminFeedback />
    </>
  );
};

export default Feedback;
