import {
  ExtendedModalDataType,
  ModalDataType,
  Pedido,
} from "@/types/interfaces";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextValue {
  isVisible: boolean;
  modalData: ExtendedModalDataType;
  openModal: (data: ExtendedModalDataType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Inicializa el estado con todas las propiedades de ExtendedModalDataType
  const [modalData, setModalData] = useState<ExtendedModalDataType>({
    title: "",
    description: "",
    price: 0,
    id: 0,
    type: "",
    url: "",
    service: "",
    customerName: "",
    phoneNumber: "",
    addressDescription: "",
    municipio: "",
    dateRange: [],
  });

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const openModal = (data: ExtendedModalDataType) => {
    setModalData(data);
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <ModalContext.Provider
      value={{ isVisible, modalData, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal debe ser usado dentro de un ModalProvider");
  }
  return context;
};
