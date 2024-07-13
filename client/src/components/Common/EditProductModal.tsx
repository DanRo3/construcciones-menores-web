import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, InputNumber } from "antd";
import { FormInstance } from "antd/lib/form";
import { ProductoServer } from "@/types/interfaces";
import { FaDollarSign } from "react-icons/fa";
import { IoLink } from "react-icons/io5";
import { message } from "antd";

interface EditProductModalProps {
  visible: boolean;
  onClose: () => void;
  productData: ProductoServer;
  onSave: (updatedProduct: ProductoServer) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  visible,
  onClose,
  productData,
  onSave,
}) => {
  const [form] = Form.useForm<FormInstance>();
  const [imageUrl, setImageUrl] = useState<string>(productData.imgpath || "");

  useEffect(() => {
    setImageUrl(productData.imgpath || "");
    form.setFieldsValue({
      title: productData.name,
      price: productData.price,
      url: productData.imgpath,
    });
  }, [productData]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const updatedProduct: ProductoServer = {
        ...productData,
        name: values.title,
        price: values.price,
        imgpath: values.url,
      };
      onSave(updatedProduct);
      message.success("Producto actualizado correctamente");
      onClose();
    } catch (errorInfo) {
      console.error("Error al validar los campos:", errorInfo);
    }
  };

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
              title: productData.name,
              price: productData.price,
              url: productData.imgpath,
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
              <InputNumber
                size="large"
                style={{ width: "100%" }}
                prefix={<FaDollarSign />}
                min={0}
                precision={2}
              />
            </Form.Item>
          </Form>
        </div>
        <div>
          <Form layout="vertical">
            <Form.Item
              label="URL de la imagen"
              name="url"
              initialValue={productData.imgpath}
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese una URL para la imagen",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<IoLink />}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </Form.Item>
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
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default EditProductModal;
