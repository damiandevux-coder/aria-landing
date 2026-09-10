"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";

const testimonials = [
  {
    quote: "Aria is like the most capable all-round colleague you can imagine. She handles research, reporting, and follow-ups without me babysitting.",
    author: "Sam Kopelman",
    role: "CEO, Givr",
    hours: "10+ hours/week saved",
  },
  {
    quote: "Mindblowing all-in-one AI which does everything in a single solution. No more switching between ChatGPT, Zapier, and Notion.",
    author: "Antonín Štětina",
    role: "CEO, KULINA Group",
    hours: "10+ hours/week saved",
  },
  {
    quote: "It is kind of blown my mind seeing what Aria can actually do. I am having real conversations about investing in AI tools instead of hiring.",
    author: "Robert Tyrrell",
    role: "Owner, TalentBright",
    hours: "10+ hours/week saved",
  },
];

export default function TestimonialsSection() {
  return (
    <SectionWrapper className="bg-hyper-dark">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What our customers say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
            >
              <p className="text-hyper-light leading-relaxed mb-6 text-sm">
                "{t.quote}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-hyper-light">{t.author}</p>
                  <p className="text-xs text-hyper-muted">{t.role}</p>
                </div>
                <span className="text-xs text-hyper-teal bg-hyper-teal/10 px-2 py-1 rounded">
                  {t.hours}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
