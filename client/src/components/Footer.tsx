/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * Minimal footer: logo + tagline, links, copyright, social icons
 */
import { Linkedin, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Logo + tagline */}
          <div>
            <a href="#" className="font-heading font-bold text-lg text-white">
              Operator<span className="gradient-text">AI</span>
            </a>
            <p className="text-white/30 text-sm mt-1">
              The AI System Built for Roofing Contractors
            </p>
          </div>

          {/* Center: Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              Terms
            </a>
          </div>

          {/* Right: Social */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/10 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/10 transition-all"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/10 transition-all"
              aria-label="YouTube"
            >
              <Youtube size={16} />
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            &copy; 2026 OperatorAI. Built for roofers. Expanding to all trades.
          </p>
          <a
            href="#"
            className="text-white/20 hover:text-white/40 text-xs transition-colors"
          >
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
