import { Check, SlackLogo } from "@phosphor-icons/react/dist/ssr";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import { SIGNUP_URL } from "../lib/links";

const included = [
  "3 large agents on your workspace",
  "100M tokens a day",
  "Web, browser, code, files, scheduling",
  "Unlimited channels",
  "Cost posted on every run",
  "Memory you can read and export",
  "Approval flow for sensitive actions",
  "14-day free trial, no card",
];

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal as="header" className="max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">One plan. Everything included.</h2>
          <p className="mt-4 max-w-[48ch] text-lg text-fg-2">
            Less than a day of a contractor&rsquo;s time, every month. Cancel from Slack.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 grid overflow-hidden rounded-card border border-line-2 bg-ink-3/60 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="relative border-b border-line p-8 md:border-b-0 md:border-r md:p-10">
            <div
              className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue/20 blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <p className="text-[15px] font-semibold text-fg-2">Pro</p>
              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="tnum text-6xl font-bold tracking-[-0.04em]">$149</span>
                <span className="text-lg text-fg-2">/ month</span>
              </p>
              <p className="mt-3 text-[15px] text-fg-2">Billed monthly. Usage included, cost still shown per run.</p>
              <Button href={SIGNUP_URL} className="mt-8 w-full sm:w-auto" external>
                <SlackLogo weight="bold" className="h-4 w-4" />
                Add Aria to Slack
              </Button>
            </div>
          </div>
          <ul className="grid gap-x-8 gap-y-4 p-8 sm:grid-cols-2 md:p-10">
            {included.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[15.5px] text-fg">
                <Check className="mt-1 h-4 w-4 shrink-0 text-teal" weight="bold" />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
