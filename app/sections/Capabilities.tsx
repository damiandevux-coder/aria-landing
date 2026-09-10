"use client";

import {
  Broadcast,
  MagnifyingGlass,
  Globe,
  Terminal,
  FilePdf,
  CalendarCheck,
  ArrowRight,
} from "@phosphor-icons/react";
import Reveal from "../components/Reveal";

const cell =
  "group relative overflow-hidden rounded-card border border-line bg-ink-3/60 p-6 transition-[border-color,background-color] duration-300 hover:border-line-2 hover:bg-ink-3";

export default function Capabilities() {
  return (
    <section id="toolkit" className="scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal as="header" className="max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">One agent. The whole toolkit.</h2>
          <p className="mt-4 max-w-[52ch] text-lg text-fg-2">
            Aria runs on OpenClaw, so she has every tool a capable agent needs. There is nothing to configure.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {/* Multi-channel: featured */}
          <Reveal className={`${cell} md:col-span-2`}>
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-70"
              aria-hidden
            />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div>
                <Broadcast className="h-6 w-6 text-blue-2" weight="regular" />
                <h3 className="mt-4 text-xl font-semibold">Reads across channels</h3>
                <p className="mt-2 max-w-[40ch] text-[15px] leading-relaxed text-fg-2">
                  Context from #sales shows up in the brief you asked for in #growth. She only reads where she
                  is invited.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[13px]">
                {["#sales", "#support", "#pricing"].map((c) => (
                  <span key={c} className="rounded-chip border border-line bg-ink-2 px-2.5 py-1 font-medium text-fg-2">
                    {c}
                  </span>
                ))}
                <ArrowRight className="h-4 w-4 text-fg-3" weight="bold" />
                <span className="rounded-chip bg-blue/15 px-2.5 py-1 font-medium text-blue-2">brightwater-brief.pdf</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05} className={cell}>
            <MagnifyingGlass className="h-6 w-6 text-blue-2" weight="regular" />
            <h3 className="mt-4 text-xl font-semibold">Web search</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
              Searches, opens the sources, and cites them in what she hands back.
            </p>
          </Reveal>

          <Reveal delay={0.1} className={cell}>
            <Globe className="h-6 w-6 text-blue-2" weight="regular" />
            <h3 className="mt-4 text-xl font-semibold">Browser</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
              Fills forms, reads dashboards, and screenshots what she found so you can check it.
            </p>
          </Reveal>

          {/* Code: featured with a real snippet */}
          <Reveal delay={0.05} className={`${cell} md:col-span-2`}>
            <div className="grid h-full gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <Terminal className="h-6 w-6 text-blue-2" weight="regular" />
                <h3 className="mt-4 text-xl font-semibold">Code execution</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
                  Her own machine with Python, Node and a shell. She clones repos, runs the tests, and opens the
                  PR.
                </p>
              </div>
              <pre className="tnum self-end overflow-hidden rounded-[10px] border border-line bg-ink-2 p-4 font-mono text-[12.5px] leading-relaxed text-fg-2">
                <code>
                  <span className="text-fg-3">$</span> git clone web-app{"\n"}
                  <span className="text-fg-3">$</span> pnpm test pricing{"\n"}
                  <span className="text-teal">84 passed</span>, 1 new{"\n"}
                  <span className="text-fg-3">$</span> gh pr create{"\n"}
                  <span className="text-blue-2">#412</span> opened
                </code>
              </pre>
            </div>
          </Reveal>

          <Reveal delay={0.1} className={cell}>
            <FilePdf className="h-6 w-6 text-blue-2" weight="regular" />
            <h3 className="mt-4 text-xl font-semibold">Files and canvas</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
              Reads and writes PDFs, spreadsheets, and docs. Drafts long pieces in a Slack canvas your team can edit.
            </p>
          </Reveal>

          <Reveal delay={0.15} className={cell}>
            <CalendarCheck className="h-6 w-6 text-blue-2" weight="regular" />
            <h3 className="mt-4 text-xl font-semibold">Scheduled tasks</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-2">
              Cron in plain English. &ldquo;Every Monday at 8&rdquo; is a complete spec.
            </p>
            <p className="tnum mt-5 inline-flex items-center gap-2 rounded-chip border border-line bg-ink-2 px-2.5 py-1 font-mono text-[12px] text-fg-2">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
              next run Mon 08:00
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
