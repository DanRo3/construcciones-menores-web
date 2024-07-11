"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      router.push("/home");
    }
  }, [router]);

  return null;
};

export default AuthRedirect;
