import { Modal, Form, Input, Button, InputNumber } from "antd";
import { FormInstance } from "antd/lib/form";
import TextArea from "antd/es/input/TextArea";
import { IoLink } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { ServicioServer } from "../Tables/ServiceTable";

interface EditServiceModalProps {
  visible: boolean;
  onClose: () => void;
  serviceData: ServicioServer;
  onSave: (data: ServicioServer) => void;
}

const EditServiceModal: React.FC<EditServiceModalProps> = ({
  visible,
  onClose,
  serviceData,
  onSave,
}) => {
  const [form] = Form.useForm<FormInstance>();
  const [imageUrl, setImageUrl] = useState<string>(serviceData.img || "");

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      onSave({
        id_servicio: serviceData.id_servicio,
        nombre: serviceData.nombre,
        price: serviceData.price,
        descripcion: serviceData.descripcion,
        img: serviceData.img,
      });
      onClose();
    } catch (errorInfo) {
      console.error("Error validating fields:", errorInfo);
    }
  };

  useEffect(() => {
    setImageUrl(serviceData.img || "");
  }, [serviceData.img]);

  useEffect(() => {
    form.setFieldsValue({
      nombre: serviceData.nombre,
      price: serviceData.price,
      description: serviceData.descripcion,
      url: serviceData.img,
    });
  }, [serviceData, form]);

  return (
    <Modal
      title="Editar Servicio"
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
              nombre: serviceData.nombre,
              price: serviceData.price,
              description: serviceData.descripcion,
              url: serviceData.img,
            }}
            onValuesChange={(_, allValues) => {
              setImageUrl(allValues.img || "");
            }}
          >
            <Form.Item
              label="Nombre del servicio"
              name="nombre"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese un nombre para el servicio",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Precio del servicio"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese un precio para el servicio",
                },
              ]}
            >
              <InputNumber size="large" addonBefore={<FaDollarSign />} />
            </Form.Item>
            <Form.Item
              label="Descripción"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese una descripción para el servicio",
                },
              ]}
            >
              <TextArea showCount maxLength={300} size="large" />
            </Form.Item>
          </Form>
        </div>

        <div className="flex flex-col space-y-4">
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              url: serviceData.img,
            }}
            onValuesChange={(_, allValues) => {
              setImageUrl(allValues.img || "");
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

export default EditServiceModal;
