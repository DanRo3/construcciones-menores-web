"use client";
import React, { useRef, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { CardProps, ServiceValues } from "@/types/interfaces";
import { useModal } from "../Common/ContextModal";

import {
  Modal,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  TreeSelect,
} from "antd";
import { useForm } from "antd/es/form/Form";

const { RangePicker } = DatePicker;

const MunicipiosHabana = [
  {
    title: "Habana Vieja",
    value: "Habana Vieja",
  },
  {
    title: "Centro Habana",
    value: "Centro Habana",
  },
  {
    title: "Cerro",
    value: "Cerro",
  },
  {
    title: "Diez de Octubre",
    value: "Diez de Octubre",
  },
  {
    title: "Plaza",
    value: "Plaza",
  },
  {
    title: "Arroyo Naranjo",
    value: "Arroyo Naranjo",
  },
  {
    title: "Boyeros",
    value: "Boyeros",
  },
  {
    title: "Cotorro",
    value: "Cotorro",
  },
  {
    title: "San Miguel del Padrón",
    value: "San Miguel del Padrón",
  },
  {
    title: "Playa",
    value: "Playa",
  },
  {
    title: "Marianao",
    value: "Marianao",
  },
  {
    title: "La Lisa",
    value: "La Lisa",
  },
  {
    title: "Habana del Este",
    value: "Habana del Este",
  },
  {
    title: "Guanabacoa",
    value: "Guanabacoa",
  },
  {
    title: "Regla",
    value: "Regla",
  },
];

const cardsServices: {
  url: string;
  title: string;
  price: number;
  description: string;
  id: number;
}[] = [
  {
    url: "https://media.istockphoto.com/id/468996060/es/foto/trabajador-de-construcci%C3%B3n-de-la-casa-de-alba%C3%B1iler%C3%ADa-wal.jpg?s=612x612&w=0&k=20&c=9AARfQCtfEnnNMf4Ri3YlvTuGybab02PgH34FVKYVSM=",
    title: "Construccion de muros",
    price: 20,
    description: "Levantamiento de paredes y muros",
    id: 1,
  },
  {
    url: "https://media.istockphoto.com/id/1221306297/es/foto/el-hombre-vierte-pintura-en-la-bandeja-y-sumerge-el-rodillo-trabajador-profesional-de-la.jpg?s=612x612&w=0&k=20&c=_qILsrUuQiFUVL7BE8I-gwXxp_pY8T0VJdv6Tpd4Ab8=",
    title: "Servicio de pintura",
    price: 3,
    description: "Pintura para interiores y fachadas",
    id: 2,
  },
  {
    url: "https://media.istockphoto.com/id/1083735696/es/foto/perito-en-casco-y-chaqueta-de-alta-visibilidad-con-tableta-digital-realizando-inspecci%C3%B3n-de.jpg?s=612x612&w=0&k=20&c=iXRH7zHgmMuCGr4vMYAecxzEbXXkVh8fa9q876sprzw=",
    title: "Servicio de defectación",
    price: 20,
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
          <p>{card.price} $ / Mt</p>
        </div>
        <div className="flex flex-row justify-between backdrop-blur-sm bg-black/30 text-white p-6">
          <div className="flex flex-col">
            <p className="font-semibold text-xl">{card.title}</p>
            <p>{card.description}</p>
          </div>
          <button
            className="border-white border-2 p-3 rounded-xl hover:bg-green-500 transition-all"
            onClick={() => openModal({ ...card })}
          >
            Solicitar
          </button>
        </div>
      </div>
    </div>
  );
};

const Servicios: React.FC = () => {
  const { isVisible, modalData, closeModal } = useModal();
  const [value, setValue] = useState<string>();

  const [form] = useForm();

  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  const handleSubmit = (values: ServiceValues) => {
    console.log(values);
  };

  return (
    <div>
      <div className="flex w-full text-center items-center justify-center">
        <span className="font-semibold text-5xl">Nuestros servicios</span>
      </div>
      <HorizontalScrollCarousel />
      {isVisible && (
        <Modal
          title="Solicitud de servicio"
          visible={isVisible}
          onOk={closeModal}
          onCancel={closeModal}
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            zIndex: "9999999",
          }}
          footer={
            [
              // <Button key={89129312389123} style={{ display: "none" }}>
              //   Cancelar
              // </Button>,
              // <Button key={89129312389124} style={{ display: "none" }}>
              //   Aceptar
              // </Button>,
            ]
          }
        >
          <Form variant="filled" onFinish={handleSubmit}>
            <Form.Item
              label=""
              name="InputNumber"
              rules={[
                {
                  required: true,
                  message: "Por favor escribe un número de teléfono",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Número de teléfono"
              />
            </Form.Item>

            <Form.Item
              label=""
              name="TreeSelect"
              rules={[
                {
                  required: true,
                  message: "Por favor selecciona un municipio",
                },
              ]}
            >
              <TreeSelect
                placeholder="Selecciona tu municipio"
                style={{ width: "100%" }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                treeData={MunicipiosHabana}
                treeDefaultExpandAll
                onChange={onChange}
              />
            </Form.Item>

            <Form.Item
              label=""
              name="TextArea"
              rules={[
                { required: true, message: "Por favor escribe una referencia" },
              ]}
            >
              <Input.TextArea placeholder="Escribe aqui una referencia de la dirección" />
            </Form.Item>

            <Form.Item
              label=""
              name="RangePicker"
              rules={[
                { required: true, message: "Selecciona un rango de días" },
              ]}
            >
              <RangePicker className="z-999999" />
            </Form.Item>

            <Form.Item
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "10px",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Enviar
              </Button>

              <Button type="default" onClick={closeModal}>
                Cancelar
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default Servicios;
