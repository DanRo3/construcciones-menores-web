'use client';
import React, { useRef, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { CardProps } from "@/types/interfaces";
import { useModal } from "../Common/ContextModal";
import { Modal } from "antd";



const cardsServices: { url: string; title: string; basePrice: number; description: string; id: number }[] = [
  {
    url: "https://media.istockphoto.com/id/468996060/es/foto/trabajador-de-construcci%C3%B3n-de-la-casa-de-alba%C3%B1iler%C3%ADa-wal.jpg?s=612x612&w=0&k=20&c=9AARfQCtfEnnNMf4Ri3YlvTuGybab02PgH34FVKYVSM=",
    title: "Construccion de muros",
    basePrice: 20,
    description: "Levantamiento de paredes y muros",
    id: 1,
  },
  {
    url: "https://media.istockphoto.com/id/1221306297/es/foto/el-hombre-vierte-pintura-en-la-bandeja-y-sumerge-el-rodillo-trabajador-profesional-de-la.jpg?s=612x612&w=0&k=20&c=_qILsrUuQiFUVL7BE8I-gwXxp_pY8T0VJdv6Tpd4Ab8=",
    title: "Servicio de pintura",
    basePrice: 3,
    description: "Pintura para interiores y fachadas",
    id: 2,
  },
  {
    url: "https://media.istockphoto.com/id/1083735696/es/foto/perito-en-casco-y-chaqueta-de-alta-visibilidad-con-tableta-digital-realizando-inspecci%C3%B3n-de.jpg?s=612x612&w=0&k=20&c=iXRH7zHgmMuCGr4vMYAecxzEbXXkVh8fa9q876sprzw=",
    title: "Servicio de defectación",
    basePrice: 20,
    description: "Pintura para interiores y fachadas",
    id: 2,
  },
  
];

const HorizontalScrollCarousel: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-transparent">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cardsServices.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </motion.div>
      </div> 
    </section>
  );
};

const Card: React.FC<CardProps> = ({ card }) => {
  const { openModal } = useModal();

  return (
    <div
      key={card.id}
      className="group relative h-[420px] w-[420px] overflow-hidden rounded-2xl bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 flex flex-col justify-between">
        <div className="self-end backdrop-blur-sm bg-black/30 text-white text-3xl p-2 rounded-lg mt-3 mr-3">
            <p>{card.basePrice} $ / Mt</p>
        </div>
        <div className="flex flex-row justify-between backdrop-blur-sm bg-black/30 text-white p-6">
            <div className="flex flex-col">
                <p className="font-semibold text-xl">
                {card.title}
                </p>
                <p>
                {card.description}
                </p>
            </div>
            <button className="border-white border-2 p-3 rounded-xl hover:bg-green-500 transition-all" onClick={() => openModal({...card})}>Solicitar</button>
        </div>
      </div>
    </div>
  );
};

const Servicios: React.FC = () => {
    const { isVisible, modalData, closeModal } = useModal();
    return (
      <div>
        <div className="flex w-full text-center items-center justify-center">
          <span className="font-semibold text-5xl">
            Nuestros servicios
          </span>
        </div>
        <HorizontalScrollCarousel />
        {isVisible && (
        <Modal
          title="Detalles del Servicio"
          visible={isVisible}
          onOk={closeModal}
          onCancel={closeModal}
        >
          <p><strong>Título:</strong> {modalData.title}</p>
          <p><strong>Descripción:</strong> {modalData.description}</p>
          <p><strong>Precio:</strong> ${modalData.basePrice} / Mt</p>
        </Modal>
      )}
      </div>
    );
};

export default Servicios;
