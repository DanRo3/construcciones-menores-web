"use client";
import React, { useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  useScroll,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { MdOutlineEqualizer, MdSavings } from "react-icons/md";
import {
  LuCheckCircle,
  LuHeartHandshake,
  LuMessagesSquare,
} from "react-icons/lu";
import { BsShieldCheck } from "react-icons/bs";
import { FaGratipay } from "react-icons/fa";
import { TbZoomScan } from "react-icons/tb";
import { useInView } from "react-intersection-observer";

interface MisionProps {}

const Mision: React.FC<MisionProps> = () => {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  const { inView: inView1, ref: ref1 } = useInView({ threshold: 0.1 });
  const { inView: inView2, ref: ref2 } = useInView({ threshold: 0.1 });
  const { inView: inView3, ref: ref3 } = useInView({ threshold: 0.1 });

  const animation1 = useAnimation();
  const animation2 = useAnimation();
  const animation3 = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView1) {
      animation1.start("visible");
    }
  }, [animation1, inView1]);

  useEffect(() => {
    if (inView2) {
      animation2.start("visible");
    }
  }, [animation2, inView2]);

  useEffect(() => {
    if (inView3) {
      animation3.start("visible");
    }
  }, [animation3, inView3]);

  return (
    <section id="mision" className="">
      <div className="mt-40 md:mt-0">
        <motion.div
          ref={ref1}
          initial="hidden"
          animate={animation1}
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
          }}
          className="mt-40 md:mt-0"
        >
          <TextParallaxContent
            imgUrl="https://cdn.pixabay.com/photo/2020/09/18/21/53/architecture-5583025_1280.jpg"
            subheading="Nuestros valores"
            heading="Buscan un cliente satisfecho"
          >
            <ContentOne />
          </TextParallaxContent>
        </motion.div>
        <motion.div
          ref={ref2}
          initial="hidden"
          animate={animation2}
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
          }}
          className="mt-40 md:mt-0"
        >
          <TextParallaxContent
            imgUrl="https://cdn.pixabay.com/photo/2017/07/09/03/19/home-2486092_640.jpg"
            subheading="Calidad"
            heading="A la mano de la comunicación"
          >
            <ContentTwo />
          </TextParallaxContent>
        </motion.div>
        <motion.div
          ref={ref3}
          initial="hidden"
          animate={animation3}
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
          }}
          className="mt-40 md:mt-0"
        >
          <TextParallaxContent
            imgUrl="https://cdn.pixabay.com/photo/2024/05/14/05/38/builder-8760328_640.jpg"
            subheading="Nuestra Visión"
            heading="Construir el futuro junto a ti"
          >
            <ContentThree />
          </TextParallaxContent>
        </motion.div>
      </div>
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
    <div className="col-span-1 text-3xl font-bold md:col-span-4">
      <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
        Defendemos
      </h2>
      <BsShieldCheck className="text-9xl text-green-600 md:mt-5 md:ml-6" />
    </div>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl md:text-2xl flex flex-row">
        <LuHeartHandshake className="text-3xl text-red-800" /> Compromiso con el
        cliente:
      </p>
      <p className="mb-8 text-xl md:text-lg">
        Ponemos a nuestros clientes en el centro de todo lo que hacemos.
        Escuchamos sus necesidades, nos adaptamos a sus deseos y garantizamos
        que estén satisfechos con cada proyecto.
      </p>
      <p className="mb-4 text-xl md:text-2xl flex flex-row">
        <MdSavings className="text-3xl text-blue-700" /> Eficiencia y ahorro de
        costos:
      </p>
      <p className="mb-8 text-xl md:text-lg">
        Buscamos constantemente formas innovadoras de reducir los costos de
        construcción sin sacrificar la calidad. Esto nos permite ofrecer precios
        competitivos a nuestros clientes.
      </p>
    </div>
  </div>
);

const ContentTwo: React.FC = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <div className="col-span-1 text-3xl font-bold md:col-span-4">
      <h2 className="">Construimos</h2>
      <LuCheckCircle className="text-9xl text-green-600 md:mt-5 md:ml-6" />
    </div>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl md:text-2xl flex flex-row">
        <MdOutlineEqualizer className="text-3xl text-green-700" /> Calidad sin
        compromisos:
      </p>
      <p className="mb-8 text-xl md:text-lg">
        No importa el tamaño del proyecto, siempre nos esforzamos por ofrecer
        resultados de alta calidad. Utilizamos materiales duraderos y técnicas
        de construcción probadas.
      </p>
      <p className="mb-4 text-xl md:text-2xl flex flex-row">
        <LuMessagesSquare className="text-3xl text-blue-600" /> Transparencia y
        honestidad en la comunicación:
      </p>
      <p className="mb-8 text-xl md:text-lg">
        Creemos en la comunicación abierta y honesta. Nuestros clientes pueden
        confiar en nosotros para proporcionar estimaciones precisas y cumplir
        con los plazos acordados.
      </p>
    </div>
  </div>
);

const ContentThree: React.FC = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <div className="col-span-1 text-3xl font-bold md:col-span-4">
      <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
        ¡Gracias por considerar Construcciones Menores para su próximo proyecto!
      </h2>
      <FaGratipay className="text-9xl text-red-700 md:mt-5 md:ml-6" />
    </div>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl md:text-2xl flex felx-row">
        <TbZoomScan className="text-4xl text-blue font-bold" />
        Queremos ser reconocidos como líderes en la industria de la
        construcción.
      </p>
      <p className="mb-8 text-xl md:text-lg">
        Conocidos por nuestra integridad, habilidades técnicas y compromiso con
        la satisfacción del cliente. Juntos, construiremos un futuro sólido y
        duradero.
      </p>
    </div>
  </div>
);

export default Mision;
