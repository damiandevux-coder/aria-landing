"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import AriaAvatar from "../components/AriaAvatar";

interface Message {
  id: number;
  type: "user" | "aria" | "typing";
  text?: string;
  attachment?: {
    name: string;
    size: string;
  };
}

export default function LiveDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    const sequence = [
      { delay: 500, msg: { id: 1, type: "user" as const, text: "What does our company do? I need a summary for the investor meeting." } },
      { delay: 1500, msg: { id: 2, type: "typing" as const } },
      { delay: 3500, msg: { id: 3, type: "aria" as const, text: "I read through #general, #product, and #sales channels. Here's what I found:", attachment: { name: "Company Overview — Investor Brief.pdf", size: "245 KB" } } },
      { delay: 5500, msg: { id: 4, type: "user" as const, text: "Can you also check our Q3 revenue numbers?" } },
      { delay: 7000, msg: { id: 5, type: "typing" as const } },
      { delay: 9500, msg: { id: 6, type: "aria" as const, text: "Found the revenue data in #finance. Q3 is up 34% YoY. I've added it to the brief." } },
    ];

    const timeouts: NodeJS.Timeout[] = [];

    sequence.forEach(({ delay, msg }) => {
      const timeout = setTimeout(() => {
        setMessages((prev) => {
          // Remove typing indicator when Aria responds
          if (msg.type === "aria" || msg.type === "user") {
            const filtered = prev.filter((m) => m.type !== "typing");
            return [...filtered, msg];
          }
          return [...prev, msg];
        });
      }, delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [started]);

  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0f1a]">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Live Demo</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
            See Aria in <span className="gradient-text">action</span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            Real Slack conversation. Real work delivered.
          </p>
        </AnimatedSection>

        {/* Slack mockup */}
        <AnimatedSection delay={0.2}>
          <div className="rounded-2xl overflow-hidden border border-dark-border bg-[#1a1d21] shadow-2xl">
            {/* Slack header */}
            <div className="px-4 py-3 bg-[#1a1d21] border-b border-[#2d2f34] flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#2d2f34] text-sm text-[#9ca3af]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                  </svg>
                  #general
                </div>
              </div>
              <div className="w-16" />
            </div>

            {/* Messages area */}
            <div className="p-4 space-y-2 min-h-[320px]">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {msg.type === "typing" ? (
                      <div className="flex items-center gap-3 px-2 py-2">
                        <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0">
                          <AriaAvatar size={32} animate={false} />
                        </div>
                        <div className="flex items-center gap-1 bg-[#2d2f34] rounded-full px-3 py-2">
                          <span className="w-2 h-2 rounded-full bg-[#6b7280] typing-dot" />
                          <span className="w-2 h-2 rounded-full bg-[#6b7280] typing-dot" />
                          <span className="w-2 h-2 rounded-full bg-[#6b7280] typing-dot" />
                        </div>
                      </div>
                    ) : (
                      <div className={`flex gap-3 p-2 rounded-lg ${msg.type === "user" ? "bg-[#2d2f34]/50" : ""}`}>
                        <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white text-xs font-bold">
                          {msg.type === "user" ? "JD" : <AriaAvatar size={32} animate={false} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className={`text-sm font-semibold ${msg.type === "aria" ? "text-primary" : "text-[#e8edf4]"}`}>
                              {msg.type === "aria" ? "Aria" : "John (You)"}
                            </span>
                            <span className="text-xs text-[#6b7280]">Just now</span>
                          </div>
                          <p className="text-sm text-[#d1d2d3] mt-0.5 leading-relaxed">{msg.text}</p>
                          {msg.attachment && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                              className="mt-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#2d2f34] border border-[#3f4247] hover:border-primary/30 cursor-pointer transition-colors"
                            >
                              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                              </svg>
                              <div>
                                <div className="text-sm text-[#e8edf4]">{msg.attachment.name}</div>
                                <div className="text-xs text-[#6b7280]">{msg.attachment.size}</div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {!started && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-full min-h-[200px]"
                >
                  <button
                    onClick={() => setStarted(true)}
                    className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-medium hover:bg-primary/20 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                    </svg>
                    Start the conversation
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
