import { ExtendedModalDataType } from "@/types/interfaces";
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
  const [modalData, setModalData] = useState<ExtendedModalDataType>({
    type: "Card",
    data: {},
  });

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const openModal = (data: ExtendedModalDataType) => {
    setModalData(data); // Los datos pasados aquí deben tener un `type` válido
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
