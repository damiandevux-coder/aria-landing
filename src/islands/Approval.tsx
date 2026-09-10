import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckIcon as Check } from "@phosphor-icons/react";
import { Message, RunMeta, SlackFrame } from "./slack";

type State = "idle" | "approved" | "declined";
const TOTAL = 42;

/** The approval interaction from the transparency section. Example data. */
export default function Approval() {
  const [state, setState] = useState<State>("idle");
  const [sent, setSent] = useState(0);
  const reduce = useReducedMotion();
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
    <SlackFrame channel="marketing" members="8 members">
      <Message who="aria" name="Aria" time="11:04 AM" animate={false}>
        <p>
          The follow-up for the <strong>42 leads</strong> from Tuesday&rsquo;s webinar is ready. I&rsquo;ll send
          it from your Gmail with your signature. Go ahead?
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
          <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
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
  );
}
