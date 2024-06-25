"use client";
import UserTable from "../Tables/UserTable";

const AdminUsers = () => {
  const users = [
    {
      id: 1,
      name: "Juan Barcelo Perez",
      phoneNumber: 52493489,
      email: "juan@example.com",
      profileImage:
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Cali&flip=true&rotate=20&scale=120&backgroundType=solid,gradientLinear&backgroundColor=c0aede,ffdfbf",
    },
    {
      id: 2,
      name: "Maria Julia",
      phoneNumber: 52493489,
      email: "maria@example.com",
      profileImage:
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Cookie&flip=true&rotate=20&scale=120&backgroundType=solid,gradientLinear&backgroundColor=c0aede,ffdfbf",
    },
  ];
  return (
    <>
      <UserTable users={users} />
    </>
  );
};

export default AdminUsers;
