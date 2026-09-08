"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import {
  Briefcase,
  DollarSign,
  Users,
  Megaphone,
  Headphones,
} from "lucide-react";

const departments = [
  {
    icon: Briefcase,
    title: "Executives",
    description: "Daily briefings, decision logs, strategic summaries",
    example: '"Aria, what needs my attention today?"',
    color: "#4f7cff",
  },
  {
    icon: DollarSign,
    title: "Finance",
    description: "Invoice chasing, budget alerts, spend tracking",
    example: '"Aria, which invoices are overdue?"',
    color: "#6ce8c4",
  },
  {
    icon: Users,
    title: "Sales",
    description: "Lead enrichment, pipeline hygiene, follow-up reminders",
    example: '"Aria, enrich these 50 leads before Friday"',
    color: "#f59e0b",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    description: "Content pipeline, SEO watch, campaign briefs",
    example: '"Aria, draft a blog post from our product notes"',
    color: "#ec4899",
  },
  {
    icon: Headphones,
    title: "Support",
    description: "Ticket triage, KB drafting, response templates",
    example: '"Aria, write a KB article from this thread"',
    color: "#8b5cf6",
  },
];

export default function Skills() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#10151f]">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Capabilities
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
            What Aria can{" "}
            <span className="gradient-text">do for you</span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            One agent. Every department. She learns your context and delivers
            work, not just answers.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.map((dept, index) => (
            <AnimatedSection key={dept.title} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full rounded-2xl bg-dark-card border border-dark-border p-6 hover:border-primary/20 transition-colors group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${dept.color}15` }}
                >
                  <dept.icon
                    className="w-5 h-5"
                    style={{ color: dept.color }}
                  />
                </div>

                <h3 className="text-lg font-semibold mb-2">{dept.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {dept.description}
                </p>

                <div className="pt-4 border-t border-dark-border">
                  <p className="text-xs text-muted italic">
                    Ask Aria: {dept.example}
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
