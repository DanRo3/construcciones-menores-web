"use client";
import { useAppSelector } from "@/hooks/useStore";
import { AppState } from "@/redux/store/store";
import { redirect } from "next/navigation";

const Outled = () => {
  const isAuthenticated = useAppSelector(
    (state: AppState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    redirect("/home");
  }
  return <></>;
};

export default Outled;
