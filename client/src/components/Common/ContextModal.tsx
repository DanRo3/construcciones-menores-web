import { ExtendedModalDataType, ModalDataType } from "@/types/interfaces";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextValue {
  isVisible: boolean;
  modalData: ExtendedModalDataType;
  openModal: (data: ModalDataType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalData, setModalData] = useState<ModalDataType>({
    title: "",
    description: "",
    price: 0,
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
