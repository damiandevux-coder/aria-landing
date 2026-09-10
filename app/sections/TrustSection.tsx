"use client";

import { motion } from "framer-motion";
import { X, Eye, Lock, Shield, Wallet } from "@phosphor-icons/react";
import SectionWrapper from "../components/SectionWrapper";

const themFeatures = [
  "Black-box responses",
  "Hidden costs",
  "Opaque memory",
  "Broad permissions",
];

const ariaFeatures = [
  { icon: Wallet, text: "Cost shown in every thread" },
  { icon: Eye, text: "Memory you can read and export" },
  { icon: Shield, text: "Approvals for sensitive actions" },
  { icon: Lock, text: "Only sees invited channels" },
];

export default function TrustSection() {
  return (
    <SectionWrapper id="trust" className="bg-hyper-darker">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Transparent by{" "}
            <span className="text-hyper-blue">design</span>
          </h2>
          <p className="text-hyper-muted text-lg max-w-xl mx-auto">
            Unlike other AI agents, Aria does not hide how she works.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          >
            <h3 className="text-xl font-semibold text-hyper-muted mb-6">
              Them
            </h3>
            <ul className="space-y-4">
              {themFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-hyper-muted"
                >
                  <X className="w-5 h-5 text-red-400/60 flex-shrink-0" weight="bold" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-8 rounded-2xl bg-hyper-blue/5 border border-hyper-blue/20"
          >
            <h3 className="text-xl font-semibold text-hyper-light mb-6">
              Aria
            </h3>
            <ul className="space-y-4">
              {ariaFeatures.map((feature) => (
                <li
                  key={feature.text}
                  className="flex items-center gap-3 text-hyper-light"
                >
                  <feature.icon className="w-5 h-5 text-hyper-teal flex-shrink-0" weight="bold" />
                  {feature.text}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
