"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface PageFadeProps {
  children: React.ReactNode;
}

export default function PageFade({ children }: PageFadeProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.classList.remove("fade-in");
    void el.offsetWidth;
    el.classList.add("fade-in");
  }, [pathname]);

  return (
    <div ref={containerRef} className="fade-in">
      {children}
    </div>
  );
}
