"use client";
import { ModalProvider } from "@/components/Common/ContextModal";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import dotenv from "dotenv";
import store from "@/redux/store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  dotenv.config();
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" enableSystem={false}>
        <AntdRegistry>
          <ModalProvider>{children}</ModalProvider>
        </AntdRegistry>
      </ThemeProvider>
    </Provider>
  );
}
