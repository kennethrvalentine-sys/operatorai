/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * Sticky nav, transparent → solid on scroll, logo left, links center, CTA right
 * DM Sans for logo, Inter for links
 */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "What We Do", href: "#what-we-build" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Roofing Focus", href: "#roofing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F7F4EF]/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm"
          : "bg-[#F7F4EF]/85 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <img src="/overheadless-logo.svg" alt="Overheadless" className="h-9 w-auto" />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200 nav-link-live"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Right side */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+14707529092"
            className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium"
          >
            (470) 752-9092
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-[#1f6fb2] hover:bg-[#18639e] rounded-lg transition-all duration-200 shadow-sm btn-live"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-600 hover:text-slate-900"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F7F4EF]/98 backdrop-blur-xl border-t border-slate-200">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-slate-600 hover:text-slate-900 py-2 transition-colors nav-link-live"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+14707529092"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-slate-600 hover:text-slate-900 py-2 transition-colors"
            >
              (470) 752-9092
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#1f6fb2] rounded-lg mt-2 btn-live"
            >
              Book a Call
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
