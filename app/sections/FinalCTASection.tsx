"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

export default function FinalCTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-hyper-blue/30 via-hyper-dark to-hyper-teal/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(79,124,255,0.2)_0%,_transparent_50%)]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            One hire.{" "}
            <span className="text-hyper-blue">The output of a team.</span>
          </h2>
          <p className="text-lg text-hyper-muted max-w-2xl mx-auto mb-8">
            Join 50,000+ teams already using Aria to get more done.
          </p>
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-hyper-blue hover:bg-[#3d63d1] text-white font-semibold rounded-xl transition-all shadow-lg shadow-hyper-blue/30"
          >
            Get Started for Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" weight="bold" />
          </a>
          <p className="mt-4 text-sm text-hyper-muted">
            14-day free trial. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
