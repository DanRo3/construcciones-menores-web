import React, { useState } from "react";
import { Modal, Button } from "antd";
import { Pedido } from "@/types/interfaces";
import { MdFileDownloadDone } from "react-icons/md";
import { DatePicker } from "antd";
import moment from "moment";

interface ViewOrderModalProps {
  visible: boolean;
  orderData: Pedido;
  onClose: () => void;
}

const ViewOrderModal: React.FC<ViewOrderModalProps> = ({
  visible,
  orderData,
  onClose,
}) => {
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);

  const handleDateSelection = () => {
    onClose();
    setIsCalendarModalVisible(false);
  };

  return (
    <Modal
      title="Detalle del Pedido"
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      centered
      style={{
        zIndex: 9999999,
      }}
      footer={[
        <Button
          key="edit"
          type="primary"
          icon={<MdFileDownloadDone />}
          onClick={() => setIsCalendarModalVisible(true)}
        >
          Atender
        </Button>,
      ]}
    >
      <div className="flex flex-col items-start p-5 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">{orderData.customerName}</h2>
        <p className="mb-2">
          <strong>Tipo de servicio:</strong> {orderData.service}
        </p>
        <p className="mb-2">
          <strong>Teléfono:</strong> {orderData.phoneNumber}
        </p>
        <p className="mb-2">
          <strong>Municipio:</strong> {orderData.municipio}
        </p>
        <p className="mb-2">
          <strong>Dirección:</strong> {orderData.addressDescription}
        </p>
        <p>
          <strong>Rango de Fecha:</strong> {orderData.dateRange[0]}
          {"/"}
          {orderData.dateRange[1]}
        </p>
      </div>
      <Modal
        title="Seleccionar Fecha"
        centered
        width={250}
        visible={isCalendarModalVisible}
        onCancel={() => setIsCalendarModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsCalendarModalVisible(false)}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => handleDateSelection()}
          >
            Confirmar
          </Button>,
        ]}
      >
        <div className="flex justify-center">
          <DatePicker
            onChange={(date) => console.log(date)}
            disabledDate={(current) =>
              current < moment(orderData.dateRange[0]).startOf("day") ||
              current > moment(orderData.dateRange[1]).endOf("day")
            }
            format="YYYY-MM-DD"
          />
        </div>
      </Modal>
    </Modal>
  );
};

export default ViewOrderModal;
