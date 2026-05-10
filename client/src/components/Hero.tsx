/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * Hero: badge, large headline with gradient text, subheadline, two CTAs
 * Left-aligned text, right side shows dashboard mockup image
 * Background: generated hero-bg image
 */
import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, PhoneCall, Workflow, MessageSquareMore } from "lucide-react";
import AnimatedGrid from "./AnimatedGrid";

const HERO_BG = "/hero-bg-roofing-office.png";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.classList.add("opacity-100", "translate-y-0");
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-16 opacity-0 translate-y-4 transition-all duration-1000 ease-out"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* White overlay — subtle enough to let image bleed through */}
      <div className="absolute inset-0 bg-white/55" />
      {/* Second gradient pass for the radial hint of blue */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F7F4EF]/80 via-white/65 to-white/55" />
      <AnimatedGrid />

      <div className="container relative z-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2D9CDB]/30 bg-[#2D9CDB]/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#2D9CDB] animate-pulse" />
              <span className="text-sm text-[#1f6fb2] font-medium">
                Synthetic Employees for Roofing Contractors
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] leading-[1.08] tracking-tight text-slate-900 mb-6">
              Build an <span className="gradient-text">AI Office Employee</span> for Your Roofing Business.
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
              Overheadless builds synthetic employees for roofers that answer the phone, follow up with leads and customers, work inside your CRM, and handle back-office tasks without the cost of another full-time office hire.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#1f6fb2] hover:bg-[#18639e] rounded-lg transition-all duration-200 shadow-sm btn-live group"
              >
                Book a Strategy Call
                <ArrowRight size={18} className="btn-live-arrow" />
              </a>
              <a
                href="#what-we-build"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-medium text-slate-700 border-2 border-slate-400 hover:border-[#2D9CDB] hover:text-[#1f6fb2] hover:bg-white rounded-lg transition-all duration-200 btn-live-outline"
              >
                See the Role We Build
                <ChevronDown size={18} />
              </a>
            </div>
          </div>

          {/* Right: Role Visual */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl border border-slate-200 shadow-xl bg-white/92 backdrop-blur-md p-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm max-w-lg mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#2D9CDB]" />
                  <span className="text-xs font-medium text-slate-700">AI office role built for roofers</span>
                </div>

                <div>
                  <p className="text-slate-500 text-xs tracking-[0.2em] uppercase mb-3">What it handles</p>
                  <h3 className="font-heading font-bold text-3xl text-slate-900 leading-tight mb-4">
                    Answers calls. Works the CRM. Follows up like an office employee should.
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Built to support busy roofing offices during normal weeks and storm-season chaos.
                  </p>
                </div>
              </div>

              <div className="space-y-4 px-1 pb-1">
                <div className="grid gap-3">
                  {[
                    {
                      icon: <PhoneCall size={18} />,
                      title: "Front Desk Coverage",
                      text: "Missed calls, new leads, and estimate booking handled faster.",
                    },
                    {
                      icon: <Workflow size={18} />,
                      title: "CRM Work",
                      text: "Updates pipelines inside AccuLynx, JobNimbus, Salesforce, and similar tools.",
                    },
                    {
                      icon: <MessageSquareMore size={18} />,
                      title: "Customer Follow-Up",
                      text: "Texts, emails, reminders, and next steps without manual chasing.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#2D9CDB]/15 border border-[#2D9CDB]/25 flex items-center justify-center text-[#2D9CDB] shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-slate-900 font-medium text-sm">{item.title}</p>
                          <p className="text-slate-600 text-sm mt-1 leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {['AccuLynx', 'JobNimbus', 'Salesforce'].map((tool) => (
                    <span key={tool} className="px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -inset-4 bg-[#2D9CDB]/8 rounded-2xl blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
