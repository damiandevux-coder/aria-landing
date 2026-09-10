"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SlackLogo, ArrowRight } from "@phosphor-icons/react";
import Button from "../components/Button";
import HeroDemo from "../components/HeroDemo";
import { SIGNUP_URL } from "../lib/links";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Hero() {
  const reduce = useReducedMotion();
  const item = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section id="top" className="hero-ground relative overflow-hidden pt-28 md:pt-32 lg:pt-24">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-6 pb-16 md:px-10 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[minmax(0,10fr)_minmax(0,11fr)] lg:gap-16 lg:pb-20">
        <div className="max-w-xl">
          <motion.h1
            {...item(0.05)}
            className="text-[2.75rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]"
          >
            Your first AI employee.
            <br />
            <span className="text-blue-2">Already in Slack.</span>
          </motion.h1>
          <motion.p {...item(0.18)} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-fg-2 md:text-xl">
            Aria reads your channels, does the research, writes the code, and delivers the file. Right in the
            thread.
          </motion.p>
          <motion.div {...item(0.3)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={SIGNUP_URL} className="h-12 px-6 text-base" external>
              <SlackLogo weight="bold" className="h-[18px] w-[18px]" />
              Add Aria to Slack
            </Button>
            <Button href="#how" variant="secondary" className="h-12 px-6 text-base">
              How it works
              <ArrowRight className="h-4 w-4" weight="bold" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease }}
          className="w-full lg:justify-self-end"
        >
          <HeroDemo />
        </motion.div>
      </div>
    </section>
  );
}
