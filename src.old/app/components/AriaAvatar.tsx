"use client";

import { motion } from "framer-motion";

interface AriaAvatarProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function AriaAvatar({
  size = 80,
  className = "",
  animate = true,
}: AriaAvatarProps) {
  const animationProps = animate
    ? {
        animate: {
          boxShadow: [
            "0 0 30px rgba(79, 124, 255, 0.2), 0 0 60px rgba(108, 232, 196, 0.1)",
            "0 0 50px rgba(79, 124, 255, 0.35), 0 0 100px rgba(108, 232, 196, 0.15)",
            "0 0 30px rgba(79, 124, 255, 0.2), 0 0 60px rgba(108, 232, 196, 0.1)",
          ],
        },
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      }
    : {};

  return (
    <motion.div
      {...animationProps}
      className={`rounded-full overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ariaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9db4ff" />
            <stop offset="50%" stopColor="#4f7cff" />
            <stop offset="100%" stopColor="#6ce8c4" />
          </linearGradient>
          <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f7cff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6ce8c4" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Background circle */}
        <circle cx="50" cy="50" r="48" fill="url(#ariaGrad)" opacity="0.15" />
        <circle cx="50" cy="50" r="42" fill="#161b2a" />
        {/* Face shape */}
        <ellipse cx="50" cy="55" rx="22" ry="26" fill="url(#faceGrad)" />
        {/* Eyes */}
        <ellipse cx="40" cy="48" rx="5" ry="6" fill="#e8edf4" opacity="0.9" />
        <ellipse cx="60" cy="48" rx="5" ry="6" fill="#e8edf4" opacity="0.9" />
        {/* Eye highlights */}
        <circle cx="42" cy="46" r="2" fill="#ffffff" opacity="0.6" />
        <circle cx="62" cy="46" r="2" fill="#ffffff" opacity="0.6" />
        {/* Smile */}
        <path
          d="M40 62 Q50 70 60 62"
          stroke="#6ce8c4"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        {/* Accent ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="url(#ariaGrad)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </motion.div>
  );
}
