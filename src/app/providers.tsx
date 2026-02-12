"use client";

import { PayrollProvider } from "@/context/PayrollContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PayrollProvider>
            {children}
        </PayrollProvider>
    );
}
