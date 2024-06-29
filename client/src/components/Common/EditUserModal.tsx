import { Modal, Form, Input, Button, InputNumber } from "antd";
import { User } from "@/types/interfaces";

interface EditUserModalProps {
  visible: boolean;
  onClose: () => void;
  userData: User;
  onSave: (data: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  onClose,
  userData,
  onSave,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      onSave(form.getFieldsValue());
      onClose();
    } catch (errorInfo) {
      console.error("Error validando campos:", errorInfo);
    }
  };

  return (
    <Modal
      title="Editar Usuario"
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
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: userData.name,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
        }}
      >
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: "Por favor ingrese un nombre" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Correo"
          name="email"
          rules={[{ required: true, message: "Por favor ingrese un email" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Numero de teléfono"
          name="phoneNumber"
          rules={[{ required: true, message: "Por favor ingrese un email" }]}
        >
          <InputNumber size="large" className="!w-1/2" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
