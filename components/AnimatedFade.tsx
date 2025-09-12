"use client";
import React from "react";
import { motion } from "framer-motion";
// lightweight own join to avoid new dependency
function cx(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

interface AnimatedFadeProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedFade({
  children,
  className,
}: AnimatedFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      className={cx(className)}
    >
      {children}
    </motion.div>
  );
}
