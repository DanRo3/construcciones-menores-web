import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Input,
  Typography,
  Col,
  Row,
  Divider,
  message,
} from "antd";
import { Feedback } from "@/types/interfaces";
import { DeleteOutlined } from "@ant-design/icons";
import { BsSendFill } from "react-icons/bs";
import { format } from "date-fns";

const FeedbackList: React.FC<{ onSelect: (feedback: Feedback) => void }> = ({
  onSelect,
}) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [showResponseForm, setShowResponseForm] = useState<boolean>(false);
  const [responseContent, setResponseContent] = useState<string>("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("http://localhost:1338/admin/feedbacks", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener los feedbacks");
      }
      const data = await response.json();
      setFeedbacks(
        data.feeds.map((feed: any) => ({
          id: feed.id,
          name: feed.user_name,
          email: feed.email,
          message: feed.message,
          date: feed.created,
        }))
      );
    } catch (error) {
      console.error("Error al obtener feedbacks:", error.message);
    }
  };

  const handleResponse = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setShowResponseForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        "http://localhost:1338/admin/deleteFeedback",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el feedback");
      }

      // Actualizar la lista de feedbacks después de eliminar uno
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
      console.log(`Eliminar feedback con ID: ${id}`);
    } catch (error) {
      console.error("Error al eliminar el feedback:", error.message);
    }
  };

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: "¿Estás seguro de que quieres eliminar este feedback?",
      content: "Esta acción no se puede deshacer.",
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log("Cancelado");
      },
    });
  };

  const handleResponseSubmit = () => {
    if (responseContent.trim() === "") {
      message.error("No puedes enviar una respuesta vacía.");
      return;
    }

    console.log("Responder feedback:", selectedFeedback);
    setShowResponseForm(false);
    message.success("Respuesta Enviada");
    setResponseContent(""); // Limpiar el campo de respuesta después de enviar
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mensaje",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (record: Feedback) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleResponse(record)}>
            Responder
          </Button>
          <Button
            danger
            onClick={() => showDeleteConfirm(record.id)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={feedbacks}
        pagination={false}
      />
      {selectedFeedback && (
        <Modal
          visible={showResponseForm}
          onCancel={() => setShowResponseForm(false)}
          footer={[
            <Button
              key="submit"
              type="primary"
              icon={<BsSendFill />}
              onClick={handleResponseSubmit}
            >
              Enviar respuesta
            </Button>,
            <Button key="cancel" onClick={() => setShowResponseForm(false)}>
              Cancelar
            </Button>,
          ]}
        >
          <Typography.Title level={4}>{selectedFeedback.name}</Typography.Title>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Typography.Paragraph>
                <strong>Fecha:</strong>{" "}
                {format(new Date(selectedFeedback.date), "dd/MM/yyyy HH:mm:ss")}
              </Typography.Paragraph>
              <Typography.Paragraph>
                <strong>Email:</strong> {selectedFeedback.email}
              </Typography.Paragraph>
              <Typography.Text style={{ margin: "8px 0" }}>
                <strong>Contenido:</strong>
              </Typography.Text>
              <Typography.Paragraph>
                {selectedFeedback.message}
              </Typography.Paragraph>
            </Col>
            <Divider plain>Respuesta</Divider>
            <Col span={24}>
              <Input.TextArea
                placeholder="Escribe tu respuesta aquí..."
                value={responseContent}
                onChange={(e) => setResponseContent(e.target.value)}
              />
            </Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};

export default FeedbackList;
