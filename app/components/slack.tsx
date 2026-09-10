"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Hash,
  Check,
  CircleNotch,
  FilePdf,
  FileCsv,
  GitPullRequest,
  CalendarCheck,
  MagnifyingGlass,
  Globe,
  ChatsCircle,
  Code,
} from "@phosphor-icons/react";

/*
  Slack thread primitives.
  These render a real, working component (not a static screenshot) so the page
  can demonstrate a task running to completion. All content shown through them
  is example data and is labelled as such where it appears.
*/

const enter = {
  initial: { opacity: 0, y: 10, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export function SlackFrame({
  channel,
  members,
  children,
  className = "",
  footer,
}: {
  channel: string;
  members: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
}) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-card border border-line-2 bg-ink-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] ${className}`}
    >
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-line px-4">
        <div className="flex items-center gap-1.5 text-[14px] font-semibold text-fg">
          <Hash className="h-4 w-4 text-fg-3" weight="bold" />
          {channel}
        </div>
        <div className="flex items-center gap-3 text-[12px] text-fg-3">
          <span className="hidden sm:inline">{members}</span>
          <span className="inline-flex items-center gap-1.5 rounded-chip border border-line bg-white/[0.03] px-2 py-0.5 text-fg-2">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
            Aria active
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-4 py-4 sm:px-5">{children}</div>
      {footer}
    </div>
  );
}

export function Avatar({ who }: { who: "aria" | string }) {
  if (who === "aria") {
    return (
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] bg-blue text-[14px] font-bold text-white">
        A
      </span>
    );
  }
  const initials = who
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] bg-ink-4 text-[12px] font-semibold text-fg-2">
      {initials}
    </span>
  );
}

export function Message({
  who,
  name,
  time,
  children,
  animate = true,
}: {
  who: "aria" | string;
  name: string;
  time: string;
  children: ReactNode;
  animate?: boolean;
}) {
  const reduce = useReducedMotion();
  const Wrapper = animate && !reduce ? motion.div : "div";
  const props = animate && !reduce ? enter : {};
  return (
    <Wrapper {...props} className="flex gap-3">
      <Avatar who={who} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-[14px] font-semibold text-fg">{name}</span>
          {who === "aria" && (
            <span className="rounded-[4px] bg-white/[0.08] px-1 text-[10px] font-semibold uppercase leading-4 text-fg-2">
              app
            </span>
          )}
          <span className="text-[12px] text-fg-3">{time}</span>
        </div>
        <div className="mt-0.5 space-y-2.5 text-[14.5px] leading-[1.55] text-fg-2 [&_strong]:font-semibold [&_strong]:text-fg [&_code]:rounded-[4px] [&_code]:bg-white/[0.07] [&_code]:px-1 [&_code]:py-px [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-fg">
          {children}
        </div>
      </div>
    </Wrapper>
  );
}

export function Mention({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-[4px] bg-blue/15 px-1 py-px font-medium text-blue-2">{children}</span>
  );
}

export function TypingDots({ name = "Aria" }: { name?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div {...enter} className="flex items-center gap-3">
      <Avatar who="aria" />
      <div className="flex items-center gap-2 text-[13px] text-fg-3">
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-fg-3"
              animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.1, delay: i * 0.18 }}
            />
          ))}
        </span>
        {name} is typing
      </div>
    </motion.div>
  );
}

export type StepKind = "read" | "search" | "browse" | "file" | "code";

const stepIcon: Record<StepKind, typeof Check> = {
  read: ChatsCircle,
  search: MagnifyingGlass,
  browse: Globe,
  file: FilePdf,
  code: Code,
};

export type Step = { kind: StepKind; label: string };

/** Tool activity block. `done` = number of completed steps; `active` = index of the one in progress. */
export function Activity({
  steps,
  done,
  animate = true,
}: {
  steps: Step[];
  done: number;
  animate?: boolean;
}) {
  const reduce = useReducedMotion();
  const Wrapper = animate && !reduce ? motion.div : "div";
  const props = animate && !reduce ? enter : {};
  return (
    <Wrapper
      {...props}
      className="rounded-[10px] border border-line bg-white/[0.02] px-3 py-2.5 text-[13px]"
    >
      <ul className="space-y-1.5">
        {steps.map((s, i) => {
          const Icon = stepIcon[s.kind];
          const state = i < done ? "done" : i === done ? "active" : "pending";
          if (state === "pending" && !reduce) return null;
          return (
            <motion.li
              key={s.label}
              initial={reduce ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2.5"
            >
              <span className="grid h-4 w-4 place-items-center">
                {state === "done" ? (
                  <Check className="h-3.5 w-3.5 text-teal" weight="bold" />
                ) : (
                  <CircleNotch className="h-3.5 w-3.5 animate-spin-slow text-blue-2" weight="bold" />
                )}
              </span>
              <Icon className="h-3.5 w-3.5 text-fg-3" />
              <span className={state === "done" ? "text-fg-2" : "text-fg"}>{s.label}</span>
            </motion.li>
          );
        })}
      </ul>
    </Wrapper>
  );
}

const fileIcon = {
  pdf: FilePdf,
  csv: FileCsv,
  pr: GitPullRequest,
  schedule: CalendarCheck,
} as const;

export function FileCard({
  kind,
  name,
  meta,
}: {
  kind: keyof typeof fileIcon;
  name: string;
  meta: string;
}) {
  const Icon = fileIcon[kind];
  return (
    <div className="flex items-center gap-3 rounded-[10px] border border-line bg-ink-3 px-3 py-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] bg-blue/15 text-blue-2">
        <Icon className="h-5 w-5" weight="regular" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[13.5px] font-medium text-fg">{name}</p>
        <p className="truncate text-[12px] text-fg-3">{meta}</p>
      </div>
    </div>
  );
}

/** Per-run footer: what it cost and how long it took. Shown on every task. */
export function RunMeta({ cost, time }: { cost: string; time: string }) {
  return (
    <p className="tnum font-mono text-[11.5px] text-fg-3">
      <span className="text-fg-2">Run cost {cost}</span>
      <span className="mx-2 text-fg-3/60">·</span>
      {time}
    </p>
  );
}
