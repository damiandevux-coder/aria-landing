"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  as?: "div" | "section" | "header" | "li";
};

/**
 * Scroll reveal for section headers and single key blocks.
 * Used sparingly: it is not applied to every section.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  amount = 0.3,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
