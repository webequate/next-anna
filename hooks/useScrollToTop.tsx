"use client";
import { useState, useEffect, useCallback } from "react";
import { FiChevronUp } from "react-icons/fi";

export default function ScrollToTop() {
  const [showScroll, setShowScroll] = useState(false);

  const handleScroll = useCallback(() => {
    const shouldShow = window.pageYOffset > 400;
    setShowScroll(shouldShow);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FiChevronUp
      className="scrollToTop"
      onClick={backToTop}
      style={{
        height: 40,
        width: 40,
        padding: 7,
        borderRadius: 50,
        right: 45,
        bottom: 50,
        display: showScroll ? "flex" : "none",
      }}
    />
  );
}
