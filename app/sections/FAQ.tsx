"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import Reveal from "../components/Reveal";

const faqs = [
  {
    q: "What exactly is Aria?",
    a: "An AI agent that joins your Slack as a named team member. She runs on OpenClaw, on HyperCLI's platform, with her own machine for browsing, code, and files. You talk to her the way you talk to a colleague.",
  },
  {
    q: "How is she different from ChatGPT or a Slack bot?",
    a: "A chatbot answers in text. Aria finishes the task: she searches, opens pages, runs code, writes the file, and posts it back in the thread. Most Slack bots are a single integration. Aria is a generalist.",
  },
  {
    q: "What can she see?",
    a: "Only the channels you invite her to. No DMs and no private channels unless you add her there. You can remove her from a channel at any time and she stops reading it immediately.",
  },
  {
    q: "What does a task cost?",
    a: "It depends on the work. Every run posts its cost in the thread, so you see it as it happens. Pro is a flat $149 a month with 100M tokens a day included.",
  },
  {
    q: "Can she take actions on our behalf?",
    a: "Yes, with approval. Anything that sends, spends, or deletes waits for a person to say go, in the thread. Reading and drafting never need approval.",
  },
  {
    q: "Do I need to write prompts or set up workflows?",
    a: "No. Mention @Aria and describe the job the way you would brief a new hire. If something is unclear she asks before starting.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="scroll-mt-16 border-t border-line bg-ink-2/40 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 md:px-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
        <Reveal as="header">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Questions</h2>
          <p className="mt-4 max-w-[36ch] text-lg text-fg-2">
            Anything else, ask in Slack. That is where she lives.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="divide-y divide-line border-y border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-[17px] font-medium text-fg">{f.q}</span>
                    <Plus
                      className={`h-4 w-4 shrink-0 text-fg-3 transition-transform duration-300 ease-out-expo ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      weight="bold"
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[62ch] pb-6 text-[16px] leading-relaxed text-fg-2">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
