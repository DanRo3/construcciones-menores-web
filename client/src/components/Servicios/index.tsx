"use client";
import { useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
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
import { FiAlertCircle } from "react-icons/fi";
import { redirect } from "next/navigation";
import Link from "next/link";

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
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);

  const handleRequestClick = () => {
    if (!isAuthenticated) {
      setIsOpen(true);
    } else {
      openModal({ ...card });
    }
  };

  return (
    <div
      key={card.id}
      className="group relative h-[400px] w-[380px] overflow-hidden rounded-2xl bg-neutral-200"
    >
      <div className="bg-white w-full h-full shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="overflow-hidden h-4/6 w-full">
          <div
            style={{
              backgroundImage: `url(${card.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="rounded-t-lg mb-2 p-8 w-full h-full  object-cover object-center transition duration-200 group-hover:scale-110"
          ></div>
        </div>
        <div className="px-5 pb-5">
          <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
            {card.title}
          </h3>
          <p>{card.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-green-600 dark:text-white">
              ${card.price}
            </span>
            <button
              className="dark:border-white border-green-950 border-2 p-3 rounded-xl hover:bg-green-500 transition-all"
              onClick={handleRequestClick}
            >
              Solicitar
            </button>
          </div>
        </div>
      </div>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

const SpringModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: boolean;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Importante!!!
              </h3>
              <p className="text-center mb-6">
                Para solicitar nuestros servicios debes estar autenticado.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Regresar
                </button>
                <Link
                  href="/home/signin"
                  className="bg-white text-center hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
