import { Metadata } from "next";
import Presentation from './../components/Presentation/index';

export const metadata: Metadata = {
  title: "Home | Construcciones Menores",
  description: "This is Home for Startup Nextjs Template",
};

export default function Home() {
  return (
    <>
      <Presentation />
    </>
  );
}
