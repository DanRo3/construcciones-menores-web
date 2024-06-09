'use client';
import { Inter } from "next/font/google";
import "../../styles/index.css";
import { Providers } from "./providers";
import { useEffect, useState } from "react";
import Loader from "@/components/Common/Loader";
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ["latin"] });


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
          {loading ? <Loader />: children}
        </Providers>
      </body>

    </html>
  );
}
