import React, { useState } from "react";
import { Modal, Form, Input, Button, InputNumber } from "antd";
import { Producto } from "@/types/interfaces";
import { IoLink } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { FileImageOutlined } from "@ant-design/icons";

interface CreateProductModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: Partial<Producto>) => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [form] = Form.useForm();

  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      onSave(form.getFieldsValue() as Producto);
      onClose();
    } catch (errorInfo) {
      console.error("Error validando campos:", errorInfo);
    }
  };

  return (
    <Modal
      title="Crear Producto"
      visible={visible}
      centered
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Crear Producto
        </Button>,
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Form
            form={form}
            layout="vertical"
            onValuesChange={(_, allValues) => {
              setImageUrl(allValues.url || "");
            }}
          >
            <Form.Item
              label="Nombre del producto"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese un nombre para el producto",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Precio del producto"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese un precio para el producto",
                },
              ]}
            >
              <InputNumber size="large" addonBefore={<FaDollarSign />} />
            </Form.Item>
          </Form>
        </div>

        <div className="flex flex-col space-y-4">
          <Form
            form={form}
            layout="vertical"
            onValuesChange={(_, allValues) => {
              setImageUrl(allValues.url || ""); // Corrección aquí: eliminar la línea que reiniciaba el estado a una cadena vacía
            }}
          >
            <Form.Item
              label="Imagen URL"
              name="url"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese la URL de la imagen.",
                },
              ]}
            >
              <Input size="large" addonBefore={<IoLink />} />
            </Form.Item>
          </Form>
          <div
            className="w-full h-48 border border-gray-300 rounded-lg bg-cover bg-center"
            style={{
              backgroundImage: `url(${imageUrl || ""})`,
            }}
          >
            {!imageUrl && (
              <div className="flex justify-center items-center h-full text-gray-400">
                <FileImageOutlined style={{ fontSize: "70px" }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateProductModal;
