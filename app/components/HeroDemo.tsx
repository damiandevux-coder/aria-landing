"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowsClockwise } from "@phosphor-icons/react";
import {
  Activity,
  FileCard,
  Mention,
  Message,
  RunMeta,
  SlackFrame,
  Step,
  TypingDots,
} from "./slack";

/*
  The hero's one authored motion moment: a task runs from request to delivered
  file inside a Slack thread. Phases advance on a timer while the frame is in
  view; reduced motion renders the finished state. Example data throughout.
*/

const USER_TEXT =
  "we're pitching Brightwater on Thursday. Can you pull what they've announced this quarter and how our pricing compares? PDF is fine.";

const STEPS: Step[] = [
  { kind: "read", label: "Read 34 messages in #sales" },
  { kind: "search", label: "Searched the web, 11 sources" },
  { kind: "browse", label: "Opened brightwater.com/pricing" },
  { kind: "file", label: "Wrote brightwater-brief.pdf, 4 pages" },
];

// phase: 0 idle, 1 typing, 2 aria typing, 3 ack, 4..8 activity (done = phase - 4), 9 result
const FINAL = 9;
const TYPE_MS = 24;
const DUR: number[] = [500, USER_TEXT.length * TYPE_MS + 450, 1100, 1300, 900, 1000, 1000, 1100, 700, 7000];

export default function HeroDemo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [rawPhase, setPhase] = useState(0);
  const [chars, setChars] = useState(0);
  const phase = reduce ? FINAL : rawPhase;

  const restart = () => {
    setChars(0);
    setPhase(0);
  };

  // Advance phases on a timer, only while the frame is on screen.
  useEffect(() => {
    if (reduce || !inView) return;
    const t = setTimeout(() => {
      if (rawPhase === FINAL) {
        setChars(0);
        setPhase(0);
      } else {
        setPhase(rawPhase + 1);
      }
    }, DUR[rawPhase]);
    return () => clearTimeout(t);
  }, [rawPhase, inView, reduce]);

  // Typewriter for the user's request.
  useEffect(() => {
    if (reduce || rawPhase !== 1) return;
    const id = setInterval(() => {
      setChars((c) => (c >= USER_TEXT.length ? c : c + 1));
    }, TYPE_MS);
    return () => clearInterval(id);
  }, [rawPhase, reduce]);

  const showUser = phase >= 1;
  const typingUser = phase === 1;
  const showAriaTyping = phase === 2;
  const showAck = phase >= 3;
  const showActivity = phase >= 4;
  const done = phase >= FINAL ? STEPS.length : Math.max(0, phase - 4);
  const showResult = phase >= FINAL;
  const userText = phase >= 2 ? USER_TEXT : USER_TEXT.slice(0, chars);

  return (
    <div ref={ref} className="w-full">
      <SlackFrame
        channel="growth"
        members="14 members"
        className="min-h-[460px] lg:min-h-[560px]"
        footer={
          <div className="flex h-10 shrink-0 items-center justify-between border-t border-line px-4 text-[12px] text-fg-3">
            <span>Example task, example data</span>
            <button
              type="button"
              onClick={restart}
              disabled={phase !== FINAL || !!reduce}
              className="inline-flex items-center gap-1.5 rounded-chip px-2 py-1 text-fg-2 transition-colors hover:bg-white/[0.05] hover:text-fg disabled:cursor-default disabled:opacity-40"
            >
              <ArrowsClockwise className="h-3.5 w-3.5" weight="bold" />
              Replay
            </button>
          </div>
        }
      >
        <AnimatePresence initial={false}>
          {showUser && (
            <Message key="user" who="Maya Okonkwo" name="Maya Okonkwo" time="9:12 AM">
              <p>
                <Mention>@Aria</Mention> {userText}
                {typingUser && (
                  <span className="ml-px inline-block h-[1em] w-[2px] translate-y-[2px] bg-fg-2 align-baseline motion-safe:animate-pulse" />
                )}
              </p>
            </Message>
          )}

          {showAriaTyping && <TypingDots key="typing" />}

          {showAck && (
            <Message key="ack" who="aria" name="Aria" time="9:12 AM">
              <p>
                On it. I&rsquo;ll read <strong>#sales</strong> for context first, then pull their public pricing.
              </p>
              {showActivity && <Activity steps={STEPS} done={done} />}
            </Message>
          )}

          {showResult && (
            <Message key="result" who="aria" name="Aria" time="9:19 AM">
              <p>
                Done. Three things stand out: they raised Enterprise pricing 18% in July, they dropped the free
                tier, and their API launch slipped to Q4. Brief attached, with sources on the last page.
              </p>
              <FileCard kind="pdf" name="brightwater-brief.pdf" meta="PDF, 4 pages, 1.2 MB" />
              <RunMeta cost="$0.11" time="7 min" />
            </Message>
          )}
        </AnimatePresence>

        {phase === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="m-auto text-[13px] text-fg-3">
            Waiting for a task
          </motion.p>
        )}
      </SlackFrame>
    </div>
  );
}
