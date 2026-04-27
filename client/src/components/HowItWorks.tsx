/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * 4 numbered steps, horizontal on desktop, vertical timeline on mobile
 * Blue numbered circles, connecting lines between steps
 */
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Free Demo Call",
    description:
      "We learn your current workflow, your pipeline gaps, and what's costing you jobs. Honest conversation, no pitch deck.",
  },
  {
    number: "02",
    title: "We Build Your System",
    description:
      "Our team builds your custom AI stack. You don't write code, set up integrations, or watch tutorial videos.",
  },
  {
    number: "03",
    title: "You Approve It",
    description:
      "We walk you through everything live. You see exactly what runs and when. You make the call.",
  },
  {
    number: "04",
    title: "It Runs Without You",
    description:
      "Leads get followed up. Content goes out. Your CRM stays clean. You get a report every week.",
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
    <section id="how-it-works" ref={ref} className="py-24 lg:py-32 bg-[#0D0D0D]">
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
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-3xl">
            Live in 14 Days. Running Without You in 30.
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
                <span className="text-[#2D9CDB] font-heading font-bold text-sm">{step.number}</span>
              </div>

              {/* Content */}
              <h3 className="font-heading font-bold text-lg text-white mb-3">
                {step.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
