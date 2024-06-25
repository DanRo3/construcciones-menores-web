"use client";
import { ModalProvider } from "@/components/Common/ContextModal";
import { store } from "@/redux/store/store";
import { ThemeProvider } from "next-themes";
import { Provider } from 'react-redux';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
                <AntdRegistry>
                    <ModalProvider>
                        {children}
                    </ModalProvider>
                </AntdRegistry>
            </ThemeProvider>
        </Provider>
    );
}