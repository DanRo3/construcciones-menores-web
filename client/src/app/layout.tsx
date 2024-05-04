import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { Providers } from "./providers";
import Header from "@/components/Header";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Construcciones Menores",
  description: "Web propiedad de la Mypime Construcciones Menores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="es">
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Header />
          {children}
          {/* Footer */}
        </Providers>
      </body>

    </html>
  );
}
