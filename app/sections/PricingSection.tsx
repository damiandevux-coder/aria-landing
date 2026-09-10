"use client";

import { motion } from "framer-motion";
import { Check } from "@phosphor-icons/react";
import SectionWrapper from "../components/SectionWrapper";

const features = [
  "Unlimited Slack conversations",
  "Web research & browser automation",
  "File generation (PDF, spreadsheets, code)",
  "Scheduled tasks & recurring reports",
  "Shell access & code execution",
  "Canvas & image generation",
  "Custom tool integrations",
  "Priority support",
];

export default function PricingSection() {
  return (
    <SectionWrapper id="pricing" className="bg-hyper-dark">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Simple pricing.{" "}
            <span className="text-hyper-blue">No surprises.</span>
          </h2>
          <p className="text-hyper-muted text-lg max-w-xl mx-auto">
            One plan. Everything included. Start free, upgrade when you are ready.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <p className="text-sm text-hyper-muted mb-2">Pro Plan</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold">$149</span>
              <span className="text-hyper-muted">/month</span>
            </div>
            <p className="text-sm text-hyper-muted mt-2">
              Start free - no credit card required
            </p>
          </div>

          <ul className="space-y-4 mb-8">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-hyper-teal flex-shrink-0" weight="bold" />
                <span className="text-hyper-light">{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="block w-full text-center px-8 py-4 bg-hyper-blue hover:bg-[#3d63d1] text-white font-semibold rounded-xl transition-all"
          >
            Start 14-day free trial
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
