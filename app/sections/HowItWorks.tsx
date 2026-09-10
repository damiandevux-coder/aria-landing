import Reveal from "../components/Reveal";

const steps = [
  {
    n: "1",
    title: "Add Aria to Slack",
    body: "Install from the Slack app directory. A workspace admin approves once.",
  },
  {
    n: "2",
    title: "Invite her to channels",
    body: "She only sees the channels you add her to. Nothing else, ever.",
  },
  {
    n: "3",
    title: "Give her a job",
    body: "Mention @Aria and describe the task. She asks if something is unclear, then gets to work.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-16 border-t border-line bg-ink-2/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal as="header">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Hiring her takes about two minutes.</h2>
        </Reveal>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.1} className="relative border-t border-line-2 pt-6">
              <span className="tnum font-mono text-[13px] text-blue-2">{s.n}</span>
              <h3 className="mt-3 text-[22px] font-semibold leading-tight">{s.title}</h3>
              <p className="mt-2 max-w-[36ch] text-[16px] leading-relaxed text-fg-2">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
