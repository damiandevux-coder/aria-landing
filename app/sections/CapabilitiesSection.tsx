"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  CurrencyDollar,
  Users,
  Megaphone,
  Headset,
  Globe,
  Code,
  FileText,
  Image,
  Calendar,
  MagnifyingGlass,
  Terminal,
} from "@phosphor-icons/react";
import SectionWrapper from "../components/SectionWrapper";

const tools = [
  { icon: MagnifyingGlass, label: "Web research" },
  { icon: Globe, label: "Browser automation" },
  { icon: Code, label: "Code execution" },
  { icon: FileText, label: "File generation" },
  { icon: Image, label: "Canvas & images" },
  { icon: Terminal, label: "Shell access" },
  { icon: Calendar, label: "Scheduled tasks" },
];

export default function CapabilitiesSection() {
  return (
    <SectionWrapper id="capabilities" className="bg-hyper-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            One agent.{" "}
            <span className="text-hyper-blue">Every job.</span>
          </h2>
          <p className="text-hyper-muted text-lg max-w-xl mx-auto">
            Aria is a generalist agent. She does not do one thing well. She does everything.
          </p>
        </div>

        {/* Bento grid with visual diversity */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {/* Large card - blue gradient accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-hyper-blue/10 to-transparent border border-hyper-blue/20 hover:border-hyper-blue/30 transition-all relative overflow-hidden"
          >
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-hyper-blue/[0.08] rounded-full blur-3xl" />
            <div className="relative">
              <Briefcase
                className="w-10 h-10 text-hyper-blue mb-5"
                weight="light"
              />
              <h3 className="text-2xl font-semibold mb-3">Executives</h3>
              <p className="text-hyper-muted max-w-sm leading-relaxed">
                Daily briefings, decision logs, competitive intel
              </p>
              <p className="mt-4 text-sm text-hyper-muted/70 border-l-2 border-hyper-blue/20 pl-4">
                &quot;Aria, what is our runway if we lose our top 3 customers?&quot;
              </p>
            </div>
          </motion.div>

          {/* Tall card - teal circle icon, solid bg */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="p-8 rounded-2xl bg-hyper-teal/[0.03] border border-hyper-teal/10 hover:border-hyper-teal/20 transition-all"
          >
            <div className="w-14 h-14 rounded-full bg-hyper-teal/[0.08] flex items-center justify-center mb-5">
              <CurrencyDollar className="w-7 h-7 text-hyper-teal" weight="light" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Finance</h3>
            <p className="text-hyper-muted text-sm leading-relaxed mb-4">
              Invoice chasing, budget alerts, spend analysis
            </p>
            <p className="text-sm text-hyper-muted/60">
              &quot;Aria, which vendors raised prices in the last quarter?&quot;
            </p>
          </motion.div>

          {/* Medium - no icon bg, clean */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-hyper-blue/20 transition-all"
          >
            <Users className="w-8 h-8 text-hyper-blue mb-5" weight="light" />
            <h3 className="text-xl font-semibold mb-3">Sales</h3>
            <p className="text-hyper-muted text-sm leading-relaxed mb-4">
              Lead enrichment, pipeline hygiene, proposal drafts
            </p>
            <p className="text-sm text-hyper-muted/60">
              &quot;Aria, research Acme Corp and draft a one-pager.&quot;
            </p>
          </motion.div>

          {/* Medium - warm accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="p-8 rounded-2xl bg-amber-500/[0.03] border border-amber-500/10 hover:border-amber-500/20 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/[0.08] flex items-center justify-center mb-5">
              <Megaphone className="w-5 h-5 text-amber-400" weight="light" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Marketing</h3>
            <p className="text-hyper-muted text-sm leading-relaxed mb-4">
              Content pipeline, SEO watch, campaign analysis
            </p>
            <p className="text-sm text-hyper-muted/60">
              &quot;Aria, track our SERP rankings for &apos;GPU cloud&apos; this week.&quot;
            </p>
          </motion.div>

          {/* Wide card - teal gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-hyper-teal/10 to-transparent border border-hyper-teal/20 hover:border-hyper-teal/30 transition-all relative overflow-hidden"
          >
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-hyper-teal/[0.08] rounded-full blur-3xl" />
            <div className="relative flex items-start gap-5">
              <Headset
                className="w-10 h-10 text-hyper-teal flex-shrink-0 mt-1"
                weight="light"
              />
              <div>
                <h3 className="text-2xl font-semibold mb-3">Support</h3>
                <p className="text-hyper-muted leading-relaxed">
                  Ticket triage, KB drafting, trend spotting
                </p>
                <p className="mt-4 text-sm text-hyper-muted/70">
                  &quot;Aria, summarize top complaints from #support this month.&quot;
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tools pills */}
        <div className="text-center">
          <p className="text-sm text-hyper-muted mb-6">
            Powered by a complete agent toolkit
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {tools.map((tool) => (
              <div
                key={tool.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-sm text-hyper-muted hover:border-hyper-blue/20 transition-colors"
              >
                <tool.icon className="w-3.5 h-3.5 text-hyper-blue" weight="bold" />
                {tool.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
