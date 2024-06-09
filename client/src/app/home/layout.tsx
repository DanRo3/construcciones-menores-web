'use client';
import { Inter } from "next/font/google";
import "../../styles/index.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import Footer from '../../components/Footer/index';
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect, useState } from "react";
import Loader from "@/components/Common/Loader";


const inter = Inter({ subsets: ["latin"] });



export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

    // const pathname = usePathname();

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);
  return (
    <html suppressHydrationWarning lang="es">
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Header />
            {loading ? <Loader /> : children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>

    </html>
  );
}
