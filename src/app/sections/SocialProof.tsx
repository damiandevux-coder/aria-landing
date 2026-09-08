"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, Protosync",
    message: "Aria just saved me 4 hours on investor prep. She read our entire Slack history and produced a briefing doc I actually used.",
    avatar: "SC",
    color: "#ec4899",
  },
  {
    name: "Marcus Johnson",
    role: "Head of Sales, Velora",
    message: "I asked Aria to enrich 200 leads. She was done in 20 minutes. My SDRs would have taken 3 days.",
    avatar: "MJ",
    color: "#4f7cff",
  },
  {
    name: "Priya Patel",
    role: "Finance Director, Nexogen",
    message: "She flagged 12 overdue invoices I didn't even know about. Now she chases them automatically.",
    avatar: "PP",
    color: "#6ce8c4",
  },
];

export default function SocialProof() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0c0f1a]">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Social Proof
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
            Teams are already <span className="gradient-text">hiring Aria</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full rounded-2xl bg-dark-card border border-dark-border p-6 hover:border-primary/20 transition-colors"
              >
                {/* Slack-style header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-md flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted">{t.role}</div>
                  </div>
                </div>

                {/* Message bubble */}
                <div className="bg-[#1a1d21] rounded-lg p-4 relative">
                  <div className="absolute -top-1.5 left-4 w-3 h-3 bg-[#1a1d21] rotate-45" />
                  <p className="text-sm text-[#d1d2d3] leading-relaxed relative z-10">
                    {t.message}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
