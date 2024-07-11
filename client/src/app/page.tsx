"use client";

import { useAppDispatch } from "@/hooks/useStore";
import { checkAuthStatus } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Inicio() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    router.push("/home");
  }, [router]);
  return <></>;
}
