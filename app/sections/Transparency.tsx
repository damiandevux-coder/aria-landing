"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Wallet, Eye, ShieldCheck, Lock, Check } from "@phosphor-icons/react";
import Reveal from "../components/Reveal";
import { Message, RunMeta, SlackFrame } from "../components/slack";

const points = [
  { icon: Wallet, title: "Cost shown on every run", body: "Each task posts what it cost, in the thread." },
  { icon: Eye, title: "Memory you can read", body: "Ask her what she remembers. Export it. Delete it." },
  { icon: ShieldCheck, title: "Approval before sensitive actions", body: "Sending, spending, deleting: she asks first." },
  { icon: Lock, title: "Only the channels you choose", body: "No DMs, no private channels, unless you invite her." },
];

type State = "idle" | "approved" | "declined";

export default function Transparency() {
  const [state, setState] = useState<State>("idle");
  const [sent, setSent] = useState(0);
  const reduce = useReducedMotion();
  const TOTAL = 42;

  const shown = reduce ? TOTAL : sent;

  useEffect(() => {
    if (state !== "approved" || reduce) return;
    const id = setInterval(() => {
      setSent((n) => {
        if (n >= TOTAL) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 45);
    return () => clearInterval(id);
  }, [state, reduce]);

  return (
    <section className="border-t border-line bg-ink-2/40 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-6 md:px-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-20">
        <Reveal>
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">You can see everything she does.</h2>
          <p className="mt-4 max-w-[48ch] text-lg text-fg-2">
            Cost, memory, permissions. Nothing hidden behind a dashboard you have to go and find.
          </p>
          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p.title} className="flex gap-3.5">
                <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-2" weight="regular" />
                <div>
                  <h3 className="text-[16px] font-semibold">{p.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-fg-2">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <SlackFrame channel="marketing" members="8 members">
            <Message who="aria" name="Aria" time="11:04 AM" animate={false}>
              <p>
                The follow-up for the <strong>42 leads</strong> from Tuesday&rsquo;s webinar is ready. I&rsquo;ll
                send it from your Gmail with your signature. Go ahead?
              </p>

              <div className="rounded-[10px] border border-line bg-ink-3 p-3">
                <AnimatePresence mode="wait" initial={false}>
                  {state === "idle" && (
                    <motion.div
                      key="idle"
                      exit={reduce ? undefined : { opacity: 0, y: -4 }}
                      className="flex flex-wrap items-center gap-2"
                    >
                      <span className="mr-auto text-[13px] text-fg-3">Waiting for approval</span>
                      <button
                        type="button"
                        onClick={() => setState("declined")}
                        className="h-9 rounded-btn border border-line-2 px-3.5 text-[13.5px] font-medium text-fg-2 transition-colors hover:bg-white/[0.05] hover:text-fg active:scale-[0.98]"
                      >
                        Not now
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSent(0);
                          setState("approved");
                        }}
                        className="h-9 rounded-btn bg-blue-fill px-3.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-blue-fill-hover active:scale-[0.98]"
                      >
                        Approve
                      </button>
                    </motion.div>
                  )}

                  {state === "approved" && (
                    <motion.div
                      key="approved"
                      initial={reduce ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2.5"
                    >
                      <div className="flex items-center justify-between text-[13px]">
                        <span className="inline-flex items-center gap-1.5 text-fg">
                          <Check className="h-3.5 w-3.5 text-teal" weight="bold" />
                          Approved by Maya Okonkwo
                        </span>
                        <span className="tnum font-mono text-fg-3">
                          {shown >= TOTAL ? "Sent" : "Sending"} {shown}/{TOTAL}
                        </span>
                      </div>
                      <div className="h-[3px] overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          className="h-full origin-left rounded-full bg-teal"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: shown / TOTAL }}
                          transition={{ duration: 0.1, ease: "linear" }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {state === "declined" && (
                    <motion.p
                      key="declined"
                      initial={reduce ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[13.5px] text-fg-2"
                    >
                      Okay. I saved the draft to this thread and won&rsquo;t send anything.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {state === "approved" && shown >= TOTAL && (
                <motion.div
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <RunMeta cost="$0.03" time="1 min" />
                </motion.div>
              )}
            </Message>

            {state !== "idle" && (
              <button
                type="button"
                onClick={() => setState("idle")}
                className="self-start text-[12.5px] text-fg-3 underline-offset-4 hover:text-fg-2 hover:underline"
              >
                Reset example
              </button>
            )}
          </SlackFrame>
        </Reveal>
      </div>
    </section>
  );
}
