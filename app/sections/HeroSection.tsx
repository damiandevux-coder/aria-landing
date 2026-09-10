"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "@phosphor-icons/react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden aurora-bg">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(79,124,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,124,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text - max 4 elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Not a tool.{" "}
            <span className="text-hyper-blue">A hire.</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-hyper-muted max-w-lg mb-10 leading-relaxed">
            Aria joins your Slack, learns your business, and starts delivering work in minutes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a
              href="#pricing"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-hyper-blue hover:bg-[#3d63d1] text-white font-semibold rounded-xl transition-all shadow-lg shadow-hyper-blue/20"
            >
              Add Aria to Slack
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" weight="bold" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-hyper-light font-semibold rounded-xl border border-white/10 transition-all"
            >
              <Play className="w-5 h-5 text-hyper-teal" weight="fill" />
              Watch her work
            </a>
          </div>
        </motion.div>

        {/* Right: Real image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
            <Image
              src="/hero-visual.png"
              alt="Aria AI workspace interface"
              width={600}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-hyper-dark to-transparent" />
    </section>
  );
}
