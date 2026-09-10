"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { List, X, SlackLogo } from "@phosphor-icons/react";
import Button from "./Button";
import { SIGNUP_URL } from "../lib/links";

const links = [
  { href: "#work", label: "What she does" },
  { href: "#how", label: "How it works" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    if (next !== scrolled) setScrolled(next);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-300 border-b ${
          scrolled || open
            ? "bg-ink/80 backdrop-blur-xl border-line"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:px-10">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Aria home">
            <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-blue text-[15px] font-bold leading-none text-white">
              A
            </span>
            <span className="text-[17px] font-semibold tracking-tight">Aria</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14px] font-medium text-fg-2 transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href={SIGNUP_URL} className="h-10 px-4 text-[14px]" external>
              <SlackLogo weight="bold" className="h-4 w-4" />
              Add Aria to Slack
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-btn text-fg-2 hover:text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" weight="bold" /> : <List className="h-5 w-5" weight="bold" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-btn px-3 py-3 text-[16px] font-medium text-fg-2 hover:bg-white/[0.04] hover:text-fg"
                  >
                    {l.label}
                  </a>
                ))}
                <Button href={SIGNUP_URL} className="mt-3" external>
                  <SlackLogo weight="bold" className="h-4 w-4" />
                  Add Aria to Slack
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
