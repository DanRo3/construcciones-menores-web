import { User } from "@/types/interfaces";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useModal } from "../Common/ContextModal";
import { Modal } from "antd";
import EditUserModal from "../Common/EditUserModal";

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const { isVisible, modalData, closeModal } = useModal();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleEditUser = (user: User) => {
    closeModal();
    setSelectedUser(user);
  };

  const handleDeleteUser = (userId: number) => {
    console.log(`Eliminar usuario con ID: ${userId}`);
  };

  return (
    <div className="overflow-x-auto rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <table className="min-w-full divide-y divide-gray-200 rounded-2xl overflow-hidden">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className=" py-2 text-center text-xs font-medium text-gray-500 dark:text-white tracking-wider sm:text-sm md:text-base">
              Usuario
            </th>
            <th className="py-2 text-center text-xs font-medium text-gray-500 dark:text-white tracking-wider sm:text-sm md:text-base">
              Email
            </th>
            <th className="py-2 text-center text-xs font-medium text-gray-500 dark:text-white tracking-wider sm:text-sm md:text-base">
              Teléfono
            </th>
            <th className="py-2 text-center text-xs font-medium text-gray-500 dark:text-white tracking-wider sm:text-sm md:text-base">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-dark divide-y divide-gray-200 ">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-100 dark:hover:bg-slate-600"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div
                      className="w-full h-full bg-cover rounded-full border-1"
                      style={{ backgroundImage: `url(${user.profileImage})` }}
                    ></div>
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {user.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="flex justify-center text-gray-900 dark:text-white">
                {user.email}
              </td>
              <td className="text-gray-900 dark:text-white  px-6 whitespace-nowrap">
                <div className="flex justify-center">{user.phoneNumber}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-center">
                <div className="flex space-x-2">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => handleEditUser(user)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <EditUserModal
          visible={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          userData={selectedUser}
          onSave={(updatedUser) => {
            console.log("Usuario actualizado:", updatedUser);
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default UserTable;
