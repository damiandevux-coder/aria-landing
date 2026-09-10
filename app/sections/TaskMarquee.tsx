const tasks = [
  "Summarize what changed in #support this week",
  "Chase the three invoices that are 30 days late",
  "Find every account of ours that raised a round this month",
  "Turn this thread into a one-page proposal",
  "Fix the $0 annual price on the pricing page",
  "Post a Monday briefing at 8am, every week",
  "Compare our plans to Brightwater's and Halden's",
  "Draft the onboarding emails for the new tier",
  "Watch our rankings for “GPU cloud” and tell me when they move",
  "Pull the numbers for Thursday's board deck",
];

export default function TaskMarquee() {
  const list = [...tasks, ...tasks];
  return (
    <section aria-label="Examples of tasks teams give Aria" className="border-y border-line bg-ink-2/60 py-8">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p className="text-[13px] font-medium text-fg-3">Things teams ask her</p>
      </div>
      <div className="marquee relative mt-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="marquee-track flex w-max gap-3 pr-3">
          {list.map((t, i) => (
            <li
              key={i}
              aria-hidden={i >= tasks.length}
              className="whitespace-nowrap rounded-chip border border-line bg-white/[0.02] px-4 py-2 text-[14px] text-fg-2"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
