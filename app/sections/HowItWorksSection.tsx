"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";

const steps = [
  {
    number: "01",
    title: "Add to Slack",
    desc: "One-click install from the Slack App Directory. No code, no setup.",
  },
  {
    number: "02",
    title: "Invite to channels",
    desc: "Add Aria to the channels where work happens. She only sees what you share.",
  },
  {
    number: "03",
    title: "Ask for anything",
    desc: "Research, reports, code, analysis. Aria delivers real outputs, not chat.",
  },
];

export default function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works" className="bg-hyper-dark">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Hiring your first AI employee has never been this easy
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-white/[0.06]" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative"
            >
              {/* Number circle */}
              <div className="w-16 h-16 rounded-full bg-hyper-blue/10 border border-hyper-blue/20 flex items-center justify-center mb-6 relative z-10 mx-auto md:mx-0">
                <span className="text-lg font-bold text-hyper-blue">{step.number}</span>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-center md:text-left">
                {step.title}
              </h3>
              <p className="text-hyper-muted leading-relaxed text-center md:text-left">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
