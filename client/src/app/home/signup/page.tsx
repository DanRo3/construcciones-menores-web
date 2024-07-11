import Link from "next/link";
import { Metadata } from "next";
import Singup from "@/components/Signup";
import AuthRedirect from "@/components/Common/Midlewares/Redirect";

export const metadata: Metadata = {
  title: "Crear cuenta | Construcciones Menores",
  description:
    "Esta es la página de crear una cuenta para iniciar sesión en Construcciones Menores",
  // other metadata
};

const SignupPage = () => {
  return (
    <>
      <AuthRedirect />
      <Singup />
    </>
  );
};

export default SignupPage;
