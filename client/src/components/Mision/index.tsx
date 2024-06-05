'use client';
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MisionProps {}

const Mision: React.FC<MisionProps> = () => {
  return (
    <section id="mision">
      <TextParallaxContent
        imgUrl="https://cdn.pixabay.com/photo/2024/05/14/05/38/builder-8760328_640.jpg"
        subheading="Nuestros valores"
        heading="Buscan un cliente satisfecho"
      >
        <ContentOne />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://cdn.pixabay.com/photo/2017/07/09/03/19/home-2486092_640.jpg"
        subheading="Calidad"
        heading="A la mano de la comunicación"
      >
        <ContentTwo />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://cdn.pixabay.com/photo/2020/09/18/21/53/architecture-5583025_1280.jpg"
        subheading="Nuestra Visión"
        heading="Construir el futuro junto a ti"
      >
        <ContentTree />
      </TextParallaxContent>
    </section>
  );
};

interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children?: React.ReactNode;
}

const TextParallaxContent: React.FC<TextParallaxContentProps> = ({
  imgUrl,
  subheading,
  heading,
  children,
}) => {
  return (
    <div
      style={{
        paddingLeft: 12,
        paddingRight: 12,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

interface StickyImageProps {
  imgUrl: string;
}

const StickyImage: React.FC<StickyImageProps> = ({ imgUrl }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${12 * 2}px)`,
        top: 12,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

interface OverlayCopyProps {
  subheading: string;
  heading: string;
}

const OverlayCopy: React.FC<OverlayCopyProps> = ({ subheading, heading }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const ContentOne: React.FC = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Defendemos
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl md:text-2xl">
      + Compromiso con el cliente:
      </p>
      <p className="mb-8 text-xl md:text-lg">
      Ponemos a nuestros clientes en el centro de todo lo que hacemos.
      Escuchamos sus necesidades, nos adaptamos a sus deseos y garantizamos
      que estén satisfechos con cada proyecto.
      </p>
      <p className="mb-4 text-xl md:text-2xl">
      + Eficiencia y ahorro de costos:
      </p>
      <p className="mb-8 text-xl md:text-lg">
      Buscamos constantemente formas innovadoras de reducir los costos de
      construcción sin sacrificar la calidad. Esto nos permite ofrecer 
      precios competitivos a nuestros clientes.
      </p>
    </div>
  </div>
);

const ContentTwo: React.FC = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Construimos
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl md:text-2xl">
      + Calidad sin compromisos:
      </p>
      <p className="mb-8 text-xl md:text-lg">
      No importa el tamaño del proyecto, siempre nos esforzamos por ofrecer 
      resultados de alta calidad. Utilizamos materiales duraderos y técnicas 
      de construcción probadas.
      </p>
      <p className="mb-4 text-xl md:text-2xl">
      + Transparencia y honestidad en la comunicación:
      </p>
      <p className="mb-8 text-xl md:text-lg">
      reemos en la comunicación abierta y honesta. Nuestros clientes 
      pueden confiar en nosotros para proporcionar estimaciones precisas 
      y cumplir con los plazos acordados.
      </p>
    </div>
  </div>
);

const ContentTree: React.FC = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
    ¡Gracias por considerar Construcciones Menores para su próximo proyecto!
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl md:text-2xl">
      Queremos ser reconocidos como líderes en la industria de la construcción.
      </p>
      <p className="mb-8 text-xl md:text-lg">
      Conocidos por nuestra integridad, habilidades técnicas y compromiso con
      la satisfacción del cliente. Juntos, construiremos un futuro sólido y duradero.
      </p>
    </div>
  </div>
);

export default Mision;

