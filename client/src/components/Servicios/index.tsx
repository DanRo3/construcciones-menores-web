"use client";
import { useRef, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { CardProps, PedidoForm, Servicio } from "@/types/interfaces";
import { useModal } from "../Common/ContextModal";
import dayjs from "dayjs";
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
import { municipios } from "./dataMunicipios";
import { useAppSelector } from "@/hooks/useStore";

const { RangePicker } = DatePicker;

const MunicipiosHabana = municipios;

const HorizontalScrollCarousel: React.FC = () => {
  const cardsServices: Servicio[] = useAppSelector(
    (state) => state.serviceClient.services
  );

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

  const handleSubmit = (values: PedidoForm) => {
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
          footer={[]}
        >
          <Form variant="filled" onFinish={handleSubmit}>
            <Form.Item
              label=""
              name="phone"
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
              name="municipio"
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
              name="descripcion"
              rules={[
                { required: true, message: "Por favor escribe una referencia" },
              ]}
            >
              <Input.TextArea placeholder="Escribe aqui una referencia de la dirección" />
            </Form.Item>

            <Form.Item
              label=""
              name="dateRange"
              rules={[
                { required: true, message: "Selecciona un rango de días" },
              ]}
            >
              <RangePicker
                className="z-999999"
                minDate={dayjs()}
                maxDate={dayjs().add(30, "day")}
              />
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
