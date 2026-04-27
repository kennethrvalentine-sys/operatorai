/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * Roofing-specific section with topographic background
 * 3 columns, bold labels, short copy, no icons
 */
import { useEffect, useRef, useState } from "react";

const ROOFING_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663516046814/8JP5W7DRbnVDHn5RhMag6U/roofing-section-bg-a5P5qTX7bPu97VxQVbCswg.webp";

const features = [
  {
    label: "Storm Season Ready",
    description:
      "We build surge capacity into your follow-up system so when hail hits your market, no lead goes cold while you're slammed.",
  },
  {
    label: "Insurance Job Workflow",
    description:
      "Supplement tracking, adjuster follow-up, Xactimate coordination — automated touchpoints that keep insurance jobs moving.",
  },
  {
    label: "Retail Pipeline",
    description:
      "Year-round retail demand doesn't build itself. We keep your brand in front of homeowners between storms with automated content and email sequences.",
  },
];

export default function RoofingSection() {
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
    <section
      id="roofing"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${ROOFING_BG})` }}
      />
      <div className="absolute inset-0 bg-[#0A0A0A]/80" />

      <div className="container relative z-10">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-[#2D9CDB] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
            Industry Expertise
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-2xl">
            We Speak Roofing. Not Just Tech.
          </h2>
          <p className="text-white/50 text-lg mt-4 max-w-xl">
            Most AI agencies don't know what a supplement is. We do.
          </p>
        </div>

        {/* 3 Columns */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {features.map((feature, i) => (
            <div
              key={feature.label}
              className={`transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Accent line */}
              <div className="w-10 h-0.5 bg-[#2D9CDB] mb-5" />
              <h3 className="font-heading font-bold text-xl text-white mb-3">
                {feature.label}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          className={`mt-16 pt-8 border-t border-white/5 transition-all duration-700 delay-500 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-white/25 text-sm tracking-wide">
            HVAC · Plumbing · Electrical — <span className="text-[#2D9CDB]/60">Coming Soon</span>
          </p>
        </div>
      </div>
    </section>
  );
}
