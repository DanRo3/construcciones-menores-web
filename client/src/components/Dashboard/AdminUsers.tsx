"use client";
import { useEffect, useState } from "react";
import UserTable from "../Tables/UserTable";
import { User } from "@/types/interfaces";

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:1338/admin/users", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener usuarios");
        }

        const data = await response.json();
        if (data.status === "success") {
          setUsers(
            data.users.map((user: User) => ({
              ...user,
              profileImage: `/images/client/user.png`,
            }))
          );
        } else {
          console.error("Error fetching users:", data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const updateUser = (updatedUser: User) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const deleteUser = (userId: number) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <>
      <UserTable
        users={users}
        onUpdateUser={updateUser}
        onDeleteUser={deleteUser}
      />
    </>
  );
};

export default AdminUsers;
