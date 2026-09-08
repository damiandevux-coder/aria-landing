"use client";

import { motion } from "framer-motion";

interface SlackMessageProps {
  avatar: React.ReactNode;
  username: string;
  timestamp: string;
  children: React.ReactNode;
  isOwn?: boolean;
  delay?: number;
}

export default function SlackMessage({
  avatar,
  username,
  timestamp,
  children,
  isOwn = false,
  delay = 0,
}: SlackMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`flex gap-3 p-3 rounded-lg ${
        isOwn ? "bg-[#2d2f34]" : "bg-[#1a1d21] hover:bg-[#222529]"
      } transition-colors`}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-md overflow-hidden">
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-0.5">
          <span
            className={`font-semibold text-sm ${
              isOwn ? "text-[#e8edf4]" : "text-[#4f7cff]"
            }`}
          >
            {username}
          </span>
          <span className="text-xs text-[#6b7280]">{timestamp}</span>
        </div>
        <div className="text-sm text-[#d1d2d3] leading-relaxed">{children}</div>
      </div>
    </motion.div>
  );
}
