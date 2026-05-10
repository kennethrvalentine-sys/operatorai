/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * Minimal footer: logo + tagline, links, copyright, social icons
 */
import { Linkedin, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-12 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Logo + tagline */}
          <div>
            <a href="#" className="flex items-center gap-2">
              <img src="/overheadless-logo.svg" alt="Overheadless" className="h-7 w-auto" />
            </a>
            <p className="text-slate-500 text-sm mt-2">
              Synthetic Employees for Contractors
            </p>
          </div>

          {/* Center: Phone + Links */}
          <div className="flex flex-col gap-3">
            <a href="tel:+14708741775" className="text-slate-500 hover:text-slate-900 text-sm transition-colors font-medium">
              (470) 752-9092
            </a>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-500 hover:text-slate-900 text-sm transition-colors nav-link-live">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-900 text-sm transition-colors nav-link-live">
                Terms
              </a>
            </div>
          </div>

          {/* Right: Social */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all"
              aria-label="YouTube"
            >
              <Youtube size={16} />
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            &copy; 2026 Overheadless. Synthetic employees for contractors.
          </p>
          <a
            href="#"
            className="text-slate-500 hover:text-slate-900 text-xs transition-colors"
          >
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
