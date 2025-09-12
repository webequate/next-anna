"use client";
import React from "react";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "@/hooks/useScrollToTop";

// Central place for all client-side context/providers.
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AnimatePresence>
        {children}
        <ScrollToTop />
      </AnimatePresence>
    </ThemeProvider>
  );
}
