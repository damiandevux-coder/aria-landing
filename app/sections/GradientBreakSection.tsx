"use client";

import { motion } from "framer-motion";

export default function GradientBreakSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-hyper-blue/20 via-hyper-dark to-hyper-teal/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(79,124,255,0.15)_0%,_transparent_50%)]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Aria is the AI employee that{" "}
            <span className="text-hyper-blue">does the work</span>.
          </h2>
          <p className="text-lg text-hyper-muted max-w-2xl mx-auto mb-8">
            Reports, dashboards, code, campaigns. She lives in Slack, connects to your tools, and delivers real outputs.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-hyper-blue hover:bg-[#3d63d1] text-white font-semibold rounded-xl transition-all"
          >
            Get Started for Free
          </a>
        </motion.div>
      </div>
    </section>
  );
}
