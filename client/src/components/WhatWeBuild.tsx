/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * Section label in uppercase blue, large headline, 3 glass cards with icons
 * Bento-grid inspired layout, glass-card style
 */
import { useEffect, useRef, useState } from "react";
import { Zap, PenTool, Settings } from "lucide-react";

const products = [
  {
    icon: <Zap size={28} />,
    name: "AI Lead Follow-Up System",
    tagline: "Stop losing jobs to the contractor who called back first.",
    description:
      "When a lead comes in — from your website, a referral, or a storm canvass — OperatorAI follows up instantly via text and email, qualifies them, and books the estimate on your calendar. 24/7. No manual effort.",
    price: "From $497/mo",
  },
  {
    icon: <PenTool size={28} />,
    name: "AI Content Engine",
    tagline: "Show up online while you're on the roof.",
    description:
      "We build a fully automated content system — Google Business posts, Facebook updates, email newsletters, review requests — all produced and published on autopilot. You stay visible. You stay relevant. You don't lift a finger.",
    price: "From $297/mo",
  },
  {
    icon: <Settings size={28} />,
    name: "Full Operations Stack",
    tagline: "Your entire back-office, automated.",
    description:
      "CRM buildout on GoHighLevel, power dialer integration, estimating workflow automation, job tracking, and reporting dashboards. Everything connected. Everything running without you.",
    price: "From $997/mo",
  },
];

export default function WhatWeBuild() {
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
    <section id="what-we-build" ref={ref} className="py-24 lg:py-32">
      <div className="container">
        {/* Section header */}
        <div
          className={`mb-16 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-[#2D9CDB] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
            What We Build
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-2xl">
            AI Systems Built for How Roofers Actually Work
          </h2>
          <p className="text-white/50 text-lg mt-4 max-w-xl">
            Every system is custom to your business. No templates. No guesswork.
          </p>
        </div>

        {/* Product cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <div
              key={product.name}
              className={`glass-card glass-card-hover rounded-xl p-8 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-[#2D9CDB]/10 border border-[#2D9CDB]/20 flex items-center justify-center text-[#2D9CDB] mb-6">
                {product.icon}
              </div>

              {/* Content */}
              <h3 className="font-heading font-bold text-xl text-white mb-2">
                {product.name}
              </h3>
              <p className="text-[#2D9CDB] text-sm font-medium mb-4">
                {product.tagline}
              </p>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Price */}
              <div className="inline-flex items-center px-3 py-1.5 rounded-md border border-[#2D9CDB]/20 bg-[#2D9CDB]/5">
                <span className="text-[#2D9CDB] text-sm font-semibold">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
