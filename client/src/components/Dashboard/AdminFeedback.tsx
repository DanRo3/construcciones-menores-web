"use client";
import React, { useState } from "react";
import FeedbackList from "../Feedback/FeedbackList";
import { Feedback } from "@/types/interfaces";

const AdminFeedback = () => {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );

  const handleSendReply = (message: string) => {
    if (selectedFeedback) {
      console.log(`Enviando respuesta a ${selectedFeedback.email}: ${message}`);
    } else {
      console.log("No hay feedback seleccionado para enviar respuesta.");
    }
    setSelectedFeedback(null);
  };

  return (
    <div className="p-4 rounded-2xl shadow-1">
      <FeedbackList onSelect={setSelectedFeedback} />
    </div>
  );
};

export default AdminFeedback;
