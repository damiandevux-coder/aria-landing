"use client";

import { motion } from "framer-motion";
import { FileText, Globe, Code, Image } from "lucide-react";
import SectionWrapper from "../components/SectionWrapper";

const capabilities = [
  { icon: Globe, label: "Web research" },
  { icon: FileText, label: "PDF reports" },
  { icon: Code, label: "Code & scripts" },
  { icon: Image, label: "Images & canvas" },
];

export default function LiveDemoSection() {
  return (
    <SectionWrapper id="demo" className="bg-hyper-darker">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            See Aria{" "}
            <span className="text-hyper-blue">in action</span>
          </h2>
          <p className="text-hyper-muted text-lg max-w-xl mx-auto">
            A real Slack thread. A real task. A real deliverable.
          </p>
        </div>

        {/* Slack thread mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-slack-border bg-slack-bg overflow-hidden max-w-3xl mx-auto"
        >
          {/* Thread header */}
          <div className="px-4 py-3 border-b border-slack-border flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-xs text-hyper-muted ml-2 font-mono">
              #general
            </span>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-4">
            {/* User message */}
            <div className="slack-msg bg-hyper-teal/[0.03]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded bg-hyper-teal/20 flex items-center justify-center text-xs font-bold text-hyper-teal">
                  D
                </div>
                <span className="text-sm font-semibold text-hyper-light">
                  damian
                </span>
                <span className="text-xs text-hyper-muted">10:14 AM</span>
              </div>
              <p className="text-slack-text text-sm">
                Aria, research our top 3 competitors and send me a comparison
                PDF by EOD.
              </p>
            </div>

            {/* Aria typing indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2 px-4"
            >
              <div className="w-6 h-6 rounded bg-hyper-blue/20 flex items-center justify-center text-xs font-bold text-hyper-blue">
                A
              </div>
              <div className="flex gap-1">
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="w-2 h-2 rounded-full bg-hyper-blue"
                />
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-hyper-blue"
                />
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                  className="w-2 h-2 rounded-full bg-hyper-blue"
                />
              </div>
            </motion.div>

            {/* Aria response */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              className="slack-msg bg-hyper-blue/[0.03]"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded bg-hyper-blue/20 flex items-center justify-center text-xs font-bold text-hyper-blue">
                  A
                </div>
                <span className="text-sm font-semibold text-hyper-light">
                  Aria
                </span>
                <span className="text-xs text-hyper-muted">10:16 AM</span>
              </div>
              <p className="text-slack-text text-sm mb-3">
                Done. I searched the web, read their pricing pages, and built a
                comparison. Key finding: we underprice by 40% on the Pro tier.
              </p>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03]">
                <FileText className="w-5 h-5 text-hyper-blue" />
                <div>
                  <p className="text-sm text-hyper-light font-medium">
                    competitor-analysis.pdf
                  </p>
                  <p className="text-xs text-hyper-muted">
                    3 pages · Generated by Aria
                  </p>
                </div>
              </div>
              <p className="text-xs text-hyper-muted mt-2">
                Cost: $0.04 · Sources: 8 web pages
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Capability pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {capabilities.map((cap) => (
            <div
              key={cap.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-hyper-muted"
            >
              <cap.icon className="w-4 h-4 text-hyper-teal" />
              {cap.label}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
