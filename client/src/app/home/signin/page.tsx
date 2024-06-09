import Signin from "@/components/Singin";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Iniciar sesión | Construcciones Menores",
    description: "Esta es la página de inicio de sesion de la empresa Construcciones Menores",
    // other metadata
};


const SigninPage = () => {
    
    
    return (
        <>
            <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
                <Signin />
            </section>
        </>
    )
}

export default SigninPage;
