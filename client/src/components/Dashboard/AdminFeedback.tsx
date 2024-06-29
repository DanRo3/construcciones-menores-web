"use client";
import { useState } from "react";
import FeedbackList from "../Feedback/FeedbackList";
import { Feedback } from "@/types/interfaces";

const feedbackData: Feedback[] = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@example.com",
    content: "Este es un feedback...",
    isNew: true,
    isRead: false,
    date: "2024-06-28",
  },
  {
    id: 2,
    name: "Ana García",
    email: "ana@example.com",
    content: "Me gustaría comentar...",
    isNew: false,
    isRead: true,
    date: "2024-05-28",
  },
];

const AdminFeedback = () => {
  const [feedbacks] = useState<Feedback[]>(feedbackData);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );

  const handleSendReply = (message: string) => {
    console.log(`Enviando respuesta a ${selectedFeedback?.email}: ${message}`);
    setSelectedFeedback(null);
  };

  return (
    <div className="p-4  rounded-2xl shadow-1">
      <FeedbackList feedbacks={feedbacks} onSelect={setSelectedFeedback} />
    </div>
  );
};

export default AdminFeedback;
