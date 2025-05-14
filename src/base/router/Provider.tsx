"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "@/utils/context/AuthContext";

import { CartProvider } from "@/utils/context/CartContext";

import { InitialLoadingProvider } from "@/utils/context/InitialLoadingState";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <InitialLoadingProvider>
                <AuthProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </AuthProvider>
            </InitialLoadingProvider>
        </QueryClientProvider>
    );
}