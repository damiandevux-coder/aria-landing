"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";

const features = [
  "3 large AI agents",
  "100M tokens per day",
  "Unlimited Slack channels",
  "PDF & document generation",
  "Custom memory & knowledge",
  "Priority support",
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#10151f]">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
            Start free. Scale when{" "}
            <span className="gradient-text">you're ready</span>.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Free trial */}
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-dark-card border border-dark-border p-8"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Free Trial</h3>
                <p className="text-muted text-sm">
                  Try Aria with your team. No commitment.
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted"> / 14 days</span>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "1 medium AI agent",
                  "Inference included",
                  "Up to 5 Slack channels",
                  "Basic document generation",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm">
                    <svg
                      className="w-4 h-4 text-teal flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="block w-full text-center px-6 py-3 rounded-xl border border-dark-border text-body font-medium hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                Start Free Trial
              </a>
            </motion.div>

            {/* Pro */}
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-dark-card border border-primary/20 p-8 relative overflow-hidden"
            >
              {/* Recommended badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                Recommended
              </div>

              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

              <div className="mb-6 relative z-10">
                <h3 className="text-xl font-semibold mb-2">Pro</h3>
                <p className="text-muted text-sm">
                  For teams that want Aria everywhere.
                </p>
              </div>

              <div className="mb-6 relative z-10">
                <span className="text-4xl font-bold">$149</span>
                <span className="text-muted"> / month</span>
              </div>

              <ul className="space-y-3 mb-8 relative z-10">
                {features.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm">
                    <svg
                      className="w-4 h-4 text-teal flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-[#e8edf4]">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="block w-full text-center px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all glow-blue"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                  </svg>
                  Add Aria to Slack
                </span>
              </a>
            </motion.div>
          </div>

          <p className="text-center text-sm text-muted mt-6">
            No credit card required for trial. Cancel anytime.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
