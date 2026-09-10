"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import SectionWrapper from "../components/SectionWrapper";

const faqs = [
  {
    q: "What is Aria, exactly?",
    a: "Aria is an AI employee that lives in Slack. She has her own computer in the cloud where she writes and runs code to complete tasks. She is not a chatbot. She delivers real work.",
  },
  {
    q: "How is this different from ChatGPT or Claude?",
    a: "ChatGPT and Claude answer questions. Aria does the work. She connects to your tools, runs code, generates files, and posts results back to Slack. She can also schedule recurring tasks and work autonomously.",
  },
  {
    q: "What tools does Aria connect to?",
    a: "Aria connects to 3,200+ tools via APIs and integrations. Stripe, Notion, Google Ads, Meta Ads, HubSpot, Linear, Jira, GitHub, and many more. If it has an API, Aria can use it.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. Aria only sees the channels you invite her to. She cannot read DMs or private channels. All actions go through approval workflows for sensitive operations. We are SOC 2 compliant.",
  },
  {
    q: "How much does it cost?",
    a: "Aria is $149/month for the Pro plan with unlimited tasks. We offer a 14-day free trial with no credit card required. Team plans available for larger organizations.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SectionWrapper id="faq" className="bg-hyper-darker">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">FAQ</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-medium text-hyper-light">{faq.q}</span>
                <CaretDown
                  className={`w-5 h-5 text-hyper-muted transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                  weight="bold"
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-hyper-muted leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
