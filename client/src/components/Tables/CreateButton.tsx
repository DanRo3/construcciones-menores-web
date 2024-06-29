import React from "react";
import { GrFormAdd } from "react-icons/gr";

interface props {
  onClick: void;
}

const CreateButton: React.FC = (openCreateModal) => {
  return (
    <button className="fixed bottom-4 mb-8 ml-5 md:m-7 right-4 bg-green-500 text-white rounded-full p-2 flex items-center justify-center shadow-lg shadow-green-500/50">
      <GrFormAdd size={40} onClick={() => openCreateModal} />
    </button>
  );
};

export default CreateButton;
