import { Modal, Form, Input, InputNumber, Button, message } from "antd";
import { User } from "@/types/interfaces";
import { useEffect, useState } from "react";

interface EditUserModalProps {
  visible: boolean;
  onClose: () => void;
  userData: User;
  onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  onClose,
  userData,
  onSave,
}) => {
  const [form] = Form.useForm();
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);

  useEffect(() => {
    setName(userData.name);
    setEmail(userData.email);
    setPhone(userData.phone);
    form.resetFields();
  }, []);

  const handleSave = async () => {
    try {
      await form.validateFields();
      const updatedUser = { ...userData, name, email, phone };
      const response = await fetch("http://localhost:1338/admin/updateUser", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      onSave(updatedUser);
      message.success("Usuario actualizado correctamente");
      onClose();
    } catch (error) {
      message.error(`Error al actualizar usuario: ${error.message}`);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Editar Usuario"
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Guardar cambios
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={userData}>
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: "Por favor ingrese un nombre" }]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Correo"
          name="email"
          rules={[{ required: true, message: "Por favor ingrese un correo" }]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Teléfono"
          name="phone"
          rules={[{ required: true, message: "Por favor ingrese un teléfono" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            value={phone}
            onChange={(value) => setPhone(value?.toString() || "")}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
