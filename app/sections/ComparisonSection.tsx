"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";

const comparisons = [
  {
    task: "Ad Spend Audit",
    them: "ChatGPT tells you how to audit your ad spend.",
    aria: "Audits it. Hands you the PDF.",
  },
  {
    task: "Meeting Follow-ups",
    them: "Copilot summarizes your meetings.",
    aria: "Creates the tasks, sends the follow-ups, updates the CRM.",
  },
  {
    task: "Workflow Automation",
    them: "Zapier follows rules you write.",
    aria: "Figures out what needs automating and does it.",
  },
  {
    task: "Building Tools",
    them: "Claude Code writes the code. You figure out the rest.",
    aria: "Builds it, ships it, sends you the link.",
  },
];

export default function ComparisonSection() {
  return (
    <SectionWrapper className="bg-hyper-darker">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            A chatbot responds.{" "}
            <span className="text-hyper-blue">Aria delivers.</span>
          </h2>
          <p className="text-hyper-muted text-lg max-w-xl mx-auto">
            You have tried the AI tools. The work is still there.
          </p>
        </div>

        <div className="space-y-4">
          {comparisons.map((item, i) => (
            <motion.div
              key={item.task}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="grid md:grid-cols-3 gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
            >
              <div className="md:col-span-1">
                <p className="text-sm font-medium text-hyper-muted">{item.task}</p>
              </div>
              <div className="md:col-span-1">
                <p className="text-sm text-hyper-muted/60">{item.them}</p>
              </div>
              <div className="md:col-span-1">
                <p className="text-sm text-hyper-light font-medium">{item.aria}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
