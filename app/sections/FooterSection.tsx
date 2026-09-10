export default function FooterSection() {
  return (
    <footer className="py-12 border-t border-white/[0.06] bg-hyper-darker">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">Aria</span>
          <span className="text-hyper-muted">by HyperCLI</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-hyper-muted">
          <a href="#" className="hover:text-hyper-light transition-colors">Privacy</a>
          <a href="#" className="hover:text-hyper-light transition-colors">Terms</a>
          <a href="#" className="hover:text-hyper-light transition-colors">Status</a>
        </div>
        <p className="text-sm text-hyper-muted">
          Built by HyperCLI
        </p>
      </div>
    </footer>
  );
}
