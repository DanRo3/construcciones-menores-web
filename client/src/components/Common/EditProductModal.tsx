import { Modal, Form, Input, Button, InputNumber } from "antd";
import { FormInstance } from "antd/lib/form";
import { ExtendedModalDataType } from "@/types/interfaces";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { IoLink } from "react-icons/io5";

interface EditProductModalProps {
  visible: boolean;
  onClose: () => void;
  productData: ExtendedModalDataType;
  onSave: (data: any) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  visible,
  onClose,
  productData,
  onSave,
}) => {
  const [form] = Form.useForm<FormInstance>();

  const [imageUrl, setImageUrl] = useState<string>(productData.url || "");

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      onSave(form.getFieldsValue());
      onClose();
    } catch (errorInfo) {
      console.error("Error validating fields:", errorInfo);
    }
  };

  useEffect(() => {
    setImageUrl(productData.url || "");
  }, [productData.url]);

  return (
    <Modal
      title="Editar Producto"
      visible={visible}
      centered
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Guardar cambios
        </Button>,
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              title: productData.title,
              price: productData.price,
              description: productData.description,
              url: productData.url,
            }}
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
            initialValues={{
              url: productData.url,
            }}
            onValuesChange={(_, allValues) => {
              setImageUrl(allValues.url || "");
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
                Sin imagen
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProductModal;
