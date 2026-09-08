"use client";

export default function Footer() {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0c0f1a] border-t border-dark-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9db4ff] to-[#4f7cff] flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <span className="font-semibold text-lg">Aria</span>
            </div>
            <p className="text-muted text-sm max-w-sm leading-relaxed">
              Your company's first AI employee. Aria joins your Slack,
              learns your business, and starts delivering work in minutes.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted">
              <span>Built by</span>
              <span className="font-semibold text-[#e8edf4]">HyperCLI</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-3">
              {["Features", "Pricing", "Security", "Changelog"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-muted text-sm hover:text-[#e8edf4] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {["Docs", "Blog", "Contact", "Privacy"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-muted text-sm hover:text-[#e8edf4] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-dark-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            © 2026 HyperCLI. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Terms", "Privacy", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-muted hover:text-[#e8edf4] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
