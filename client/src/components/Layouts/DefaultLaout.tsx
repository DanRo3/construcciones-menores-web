"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import HeaderDashboard from "@/components/Header-Dashboard";
import FooterMedio from "../Footer/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <HeaderDashboard sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
            <FooterMedio />
          </main>
        </div>
      </div>

    </>
  );
}
