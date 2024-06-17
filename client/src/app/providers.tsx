"use client";
import { ModalProvider } from "@/components/Common/ContextModal";
import { store } from "@/redux/store/store";
import { ThemeProvider } from "next-themes";
import { Provider } from 'react-redux';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
                <ModalProvider>
                    {children}
                </ModalProvider>
            </ThemeProvider>
        </Provider>
    );
}