import React, { useState } from "react";
import {
  Table,
  Space,
  Button,
  Tag,
  Modal,
  Input,
  Typography,
  Col,
  Row,
  Divider,
} from "antd";
import { Feedback } from "@/types/interfaces";
import { DeleteOutlined } from "@ant-design/icons";
import { BsSendFill } from "react-icons/bs";

const columns = [
  {
    title: "Fecha",
    dataIndex: "date",
    key: "date",
    sorter: (a: Feedback, b: Feedback) =>
      new Date(a.date).getTime() - new Date(b.date).getTime(),
  },
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
    title: "Estado",
    key: "actions",
    render: (record: Feedback) => (
      <Space size="middle">
        <Tag color={record.isRead ? "green" : "red"}>
          {record.isRead ? "Leído" : "No Leído"}
        </Tag>
      </Space>
    ),
  },
];

interface FeedbackListProps {
  feedbacks: Feedback[];
  onSelect: (feedback: Feedback) => void;
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks, onSelect }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [showResponseForm, setShowResponseForm] = useState<boolean>(false);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: string[]) => setSelectedRowKeys(selectedKeys),
  };

  const deleteSelected = () => {
    console.log("Eliminar seleccionados");
  };

  const handleRowClick = (record: Feedback, rowIndex: number) => {
    setSelectedFeedback(record);
    setShowResponseForm(true);
  };

  const handleResponseSubmit = () => {
    // Lógica para enviar la respuesta
    console.log("Responder feedback:", selectedFeedback);
    setShowResponseForm(false);
  };

  return (
    <div>
      <Button
        danger
        onClick={deleteSelected}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <DeleteOutlined />
      </Button>
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={feedbacks}
        pagination={false}
        onRow={(record, rowIndex) => ({
          onClick: () => handleRowClick(record, rowIndex),
        })}
      />
      {selectedFeedback && (
        <Modal
          visible={showResponseForm}
          onCancel={() => setShowResponseForm(false)}
          footer={[
            <Button
              key={12}
              type="primary"
              icon={<BsSendFill />}
              onClick={handleResponseSubmit}
            ></Button>,
            <Button key={13} onClick={() => setShowResponseForm(false)}>
              Cancelar
            </Button>,
          ]}
        >
          <Typography.Title level={4}>{selectedFeedback.name}</Typography.Title>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Typography.Paragraph>
                <strong>Fecha:</strong>{" "}
                {new Date(selectedFeedback.date).toLocaleDateString()}
              </Typography.Paragraph>
              <Typography.Paragraph>
                <strong>Email:</strong> {selectedFeedback.email}
              </Typography.Paragraph>
              <Typography.Text style={{ margin: "8px 0" }}>
                <strong>Contenido:</strong>
              </Typography.Text>
              <Typography.Paragraph>
                {selectedFeedback.content}
              </Typography.Paragraph>
            </Col>
            <Divider plain>Respuesta</Divider>
            <Col span={24}>
              <Input.TextArea placeholder="Escribe tu respuesta aquí..." />
            </Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};

export default FeedbackList;
