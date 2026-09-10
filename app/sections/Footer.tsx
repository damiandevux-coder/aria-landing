import { PLATFORM_URL } from "../lib/links";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 py-10 text-[14px] text-fg-3 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-2.5">
          <span className="grid h-6 w-6 place-items-center rounded-[6px] bg-blue text-[13px] font-bold leading-none text-white">
            A
          </span>
          <span className="font-semibold text-fg">Aria</span>
          <span>by HyperCLI</span>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          <a href={PLATFORM_URL} className="transition-colors hover:text-fg" target="_blank" rel="noopener noreferrer">
            agent.hypercli.com
          </a>
          <a href="#" className="transition-colors hover:text-fg">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-fg">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-fg">
            Status
          </a>
        </nav>
        <p className="tnum">&copy; {new Date().getFullYear()} HyperCLI</p>
      </div>
    </footer>
  );
}
