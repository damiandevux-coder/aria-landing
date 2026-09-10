import { SlackLogo } from "@phosphor-icons/react/dist/ssr";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import { SIGNUP_URL } from "../lib/links";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-line py-28 md:py-40">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_120%,rgba(79,124,255,0.28),transparent_65%)]"
        aria-hidden
      />
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
      <Reveal className="relative mx-auto max-w-[1200px] px-6 text-center md:px-10">
        <h2 className="mx-auto max-w-[18ch] text-4xl font-bold sm:text-5xl md:text-6xl">Give her the first job today.</h2>
        <p className="mx-auto mt-5 max-w-[40ch] text-lg text-fg-2">
          Fourteen days free, no card. Remove her from a channel whenever you like.
        </p>
        <div className="mt-9">
          <Button href={SIGNUP_URL} className="h-12 px-6 text-base" external>
            <SlackLogo weight="bold" className="h-[18px] w-[18px]" />
            Add Aria to Slack
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
