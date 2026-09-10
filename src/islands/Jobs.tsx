import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Activity, FileCard, Mention, Message, RunMeta, SlackFrame, type Step } from "./slack";

type Job = {
  id: string;
  tab: string;
  title: string;
  body: string;
  channel: string;
  members: string;
  ask: { who: string; time: string; text: string };
  steps: Step[];
  answer: { time: string; text: ReactNode };
  file: { kind: "pdf" | "csv" | "pr" | "schedule"; name: string; meta: string };
  run: { cost: string; time: string };
};

const jobs: Job[] = [
  {
    id: "research",
    tab: "Research",
    title: "Research that ends in a file, not a list of links.",
    body: "Aria searches the web, opens the pages, cross-checks against what your team already said in Slack, and writes the answer down where you asked for it.",
    channel: "sales",
    members: "9 members",
    ask: {
      who: "Tomás Ferreira",
      time: "8:41 AM",
      text: "which of our top 20 accounts announced funding this month? I want to reach out before the new budgets settle.",
    },
    steps: [
      { kind: "read", label: "Read the account list in #sales pinned" },
      { kind: "search", label: "Searched 20 companies, 31 sources" },
      { kind: "file", label: "Wrote funded-accounts.csv" },
    ],
    answer: {
      time: "8:47 AM",
      text: (
        <p>
          Four of them. <strong>Halden</strong> (Series B, $40M), <strong>Corvid Health</strong> (Series A),{" "}
          <strong>Marrowline</strong> (seed extension) and <strong>Pelagic</strong> (growth round). I added the
          announcement link and the exec quoted in each one.
        </p>
      ),
    },
    file: { kind: "csv", name: "funded-accounts.csv", meta: "4 rows, 6 columns" },
    run: { cost: "$0.06", time: "6 min" },
  },
  {
    id: "reports",
    tab: "Reports",
    title: "Recurring reports that write themselves.",
    body: "Give her the cadence once. She reads the channels, pulls the numbers, and posts on schedule. Correct the brief in the thread whenever it drifts.",
    channel: "support-weekly",
    members: "22 members",
    ask: {
      who: "Maya Okonkwo",
      time: "4:02 PM",
      text: "every Monday at 8, post last week's support themes here. Group by product area and link the threads.",
    },
    steps: [
      { kind: "read", label: "Read 212 messages in #support" },
      { kind: "file", label: "Drafted the first report" },
    ],
    answer: {
      time: "4:05 PM",
      text: (
        <p>
          Scheduled. First one goes out <strong>Monday 08:00</strong>. Dry run from last week: Billing had 14
          threads, mostly duplicate charges after a plan change. Integrations had 9, all the new Notion sync.
          Everything else was under 3.
        </p>
      ),
    },
    file: { kind: "schedule", name: "Weekly support themes", meta: "Mondays 08:00, #support-weekly" },
    run: { cost: "$0.05", time: "3 min" },
  },
  {
    id: "code",
    tab: "Code",
    title: "Code that arrives as a pull request.",
    body: "Aria has her own machine. She clones the repo, reproduces the bug, writes the fix and the test, and opens the PR for your review.",
    channel: "eng",
    members: "11 members",
    ask: {
      who: "Priya Raman",
      time: "10:15 AM",
      text: "pricing page shows $0 for the annual plan since this morning. Can you take a look?",
    },
    steps: [
      { kind: "code", label: "Cloned web-app, reproduced on /pricing" },
      { kind: "code", label: "Ran 84 tests, 1 new" },
      { kind: "file", label: "Opened PR #412" },
    ],
    answer: {
      time: "10:24 AM",
      text: (
        <p>
          Found it. <code>annualPrice</code> divides by <code>discountMonths</code>, which is undefined for the
          new Team tier. I added a guard and a test that covers it.
        </p>
      ),
    },
    file: { kind: "pr", name: "Guard annual price when discountMonths is unset", meta: "PR #412, 2 files, checks passing" },
    run: { cost: "$0.09", time: "9 min" },
  },
  {
    id: "documents",
    tab: "Documents",
    title: "Documents built from what your team already said.",
    body: "Proposals, one-pagers, spreadsheets, decks. Aria reads the thread, pulls the details from the right channels, and produces the file.",
    channel: "growth",
    members: "14 members",
    ask: {
      who: "Tomás Ferreira",
      time: "2:30 PM",
      text: "turn this thread into a one-page proposal for Brightwater. Their logo, our pricing for 40 seats, valid 30 days.",
    },
    steps: [
      { kind: "read", label: "Read this thread and #pricing" },
      { kind: "browse", label: "Fetched the Brightwater logo" },
      { kind: "file", label: "Wrote brightwater-proposal.pdf" },
    ],
    answer: {
      time: "2:33 PM",
      text: (
        <p>
          Here you go. Scope is from Maya&rsquo;s message above, seat price from <strong>#pricing</strong>. I
          flagged one open question at the bottom: they asked about SSO and we haven&rsquo;t answered yet.
        </p>
      ),
    },
    file: { kind: "pdf", name: "brightwater-proposal.pdf", meta: "PDF, 1 page, 340 KB" },
    run: { cost: "$0.04", time: "2 min" },
  },
];

// Tab slide: outgoing 5% in the travel direction, incoming from the opposite 5%. 250ms, symmetric ease.
const EASE_IO = [0.645, 0.045, 0.355, 1] as const;
const TAB_DUR = 0.25;

export default function Jobs() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const job = jobs[active];

  const select = (i: number) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
  };

  const slide = {
    initial: reduce ? false : { opacity: 0, x: `${5 * dir}%` },
    animate: { opacity: 1, x: 0 },
    exit: reduce ? undefined : { opacity: 0, x: `${-5 * dir}%` },
    transition: { duration: TAB_DUR, ease: EASE_IO },
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Kinds of work"
        className="flex gap-1 overflow-x-auto rounded-[12px] border border-line bg-ink-2/70 p-1 [scrollbar-width:none] md:inline-flex"
      >
        {jobs.map((j, i) => {
          const selected = i === active;
          return (
            <button
              key={j.id}
              role="tab"
              id={`tab-${j.id}`}
              aria-selected={selected}
              aria-controls={`panel-${j.id}`}
              onClick={() => select(i)}
              className={`relative shrink-0 rounded-btn px-4 py-2 text-[14px] font-medium transition-colors ${
                selected ? "text-fg" : "text-fg-3 hover:text-fg-2"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="job-tab"
                  className="absolute inset-0 rounded-btn bg-white/[0.07] ring-1 ring-inset ring-white/10"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className="relative">{j.tab}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div className="relative lg:pt-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={job.id + "-copy"} {...slide}>
              <h3 className="text-2xl font-semibold leading-snug md:text-[1.75rem]">{job.title}</h3>
              <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-fg-2">{job.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={job.id}
              id={`panel-${job.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${job.id}`}
              {...slide}
            >
              <SlackFrame channel={job.channel} members={job.members} className="min-h-[420px]">
                <Message who={job.ask.who} name={job.ask.who} time={job.ask.time} animate={false}>
                  <p>
                    <Mention>@Aria</Mention> {job.ask.text}
                  </p>
                </Message>
                <Message who="aria" name="Aria" time={job.answer.time} animate={false}>
                  <Activity steps={job.steps} done={job.steps.length} animate={false} />
                  {job.answer.text}
                  <FileCard kind={job.file.kind} name={job.file.name} meta={job.file.meta} />
                  <RunMeta cost={job.run.cost} time={job.run.time} />
                </Message>
              </SlackFrame>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
