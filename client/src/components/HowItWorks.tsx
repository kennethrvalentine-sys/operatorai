/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * 4 numbered steps, horizontal on desktop, vertical timeline on mobile
 * Blue numbered circles, connecting lines between steps
 */
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Find the Revenue Leak",
    description:
      "We identify the part of the sales process that is costing you jobs right now.",
  },
  {
    number: "02",
    title: "Build the Right System",
    description:
      "We build the system around your workflow, team, and tools.",
  },
  {
    number: "03",
    title: "Launch and Test It",
    description:
      "We install it, test it, and make sure the right leads get the right follow-up at the right time.",
  },
  {
    number: "04",
    title: "Improve the Outcome",
    description:
      "We refine it around the only outcomes that matter: more booked jobs and less manual follow-up.",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={ref} className="py-24 lg:py-32 bg-[#EEF4F8]">
      <div className="container">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-[#2D9CDB] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
            Process
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight max-w-3xl">
            Simple Process. Measurable Outcome.
          </h2>
        </div>

        {/* Steps — Desktop: horizontal, Mobile: vertical timeline */}
        <div className="grid md:grid-cols-4 gap-10 md:gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-0 h-px">
                  <div className="w-full h-full bg-gradient-to-r from-[#2D9CDB]/30 via-[#2D9CDB]/15 to-transparent" />
                </div>
              )}

              {/* Mobile vertical connector */}
              {i < steps.length - 1 && (
                <div className="md:hidden absolute left-6 top-14 bottom-[-2rem] w-px bg-gradient-to-b from-[#2D9CDB]/20 to-transparent" />
              )}

              {/* Number circle */}
              <div className="w-12 h-12 rounded-full bg-[#2D9CDB]/10 border border-[#2D9CDB]/30 flex items-center justify-center mb-5 relative z-10">
                <span className="text-[#1f6fb2] font-heading font-bold text-sm">{step.number}</span>
              </div>

              {/* Content */}
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
