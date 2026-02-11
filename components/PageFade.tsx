"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

interface PageFadeProps {
  children: React.ReactNode;
  mode?: "pathname" | "root" | "mount";
}

const getRootPath = (path: string) => {
  const parts = path.split("/").filter(Boolean);
  return parts.length ? `/${parts[0]}` : "/";
};

export default function PageFade({
  children,
  mode = "pathname",
}: PageFadeProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const fadeKey =
    mode === "mount"
      ? "mount"
      : mode === "root"
      ? getRootPath(pathname)
      : pathname;

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.classList.remove("fade-in");
    if (mode !== "mount") {
      const storageKey = "page-fade-key";
      const lastKey = sessionStorage.getItem(storageKey);
      if (lastKey === fadeKey) {
        return;
      }
      sessionStorage.setItem(storageKey, fadeKey);
    }

    void el.offsetWidth;
    el.classList.add("fade-in");
  }, [fadeKey, mode]);

  return <div ref={containerRef}>{children}</div>;
}
