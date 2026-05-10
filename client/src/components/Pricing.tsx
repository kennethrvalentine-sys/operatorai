/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * 3 pricing cards, middle one highlighted as "Most Popular"
 * Glass card style, blue accent on popular tier
 */
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Front Desk Employee",
    price: "$497",
    period: "/mo",
    popular: false,
    features: [
      "Best when missed calls and slow response are the problem",
      "Answers leads fast by text and email",
      "Estimate booking flow",
      "Built to protect revenue without another office hire",
    ],
    cta: "Book a Call",
    ctaHref: "#contact",
  },
  {
    name: "CRM Office Employee",
    price: "$997",
    period: "/mo",
    popular: true,
    features: [
      "Best when follow-up and pipeline movement are breaking down",
      "CRM updates, reminders, and follow-up sequences",
      "Works inside tools like AccuLynx, JobNimbus, and similar systems",
      "Built for cleaner follow-up and more booked jobs",
    ],
    cta: "Book a Call",
    ctaHref: "#contact",
  },
  {
    name: "Custom Synthetic Employee",
    price: "$1,997",
    period: "/mo",
    popular: false,
    features: [
      "Best when you need one AI role handling multiple office tasks",
      "Voice, chat, customer contact, and deeper workflow automation",
      "Custom build around your team and process",
      "Built to reduce admin load and support scale",
    ],
    cta: "Book a Call",
    ctaHref: "#contact",
  },
];

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" ref={ref} className="py-24 lg:py-32 bg-[#F7F4EF]">
      <div className="container">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-[#2D9CDB] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight">
            Choose the AI Role You Need First
          </h2>
          <p className="text-slate-600 text-lg mt-4 max-w-2xl mx-auto">
            Start with the office role that is costing you the most money to leave unfilled.
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-slate-200 mb-8 shadow-sm">
          <img
            src="/pricing-business-growth.png"
            alt="Roofing business growth and organized operations"
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`relative rounded-xl p-8 transition-all duration-700 hover:scale-[1.02] ${
                tier.popular
                  ? "bg-gradient-to-b from-[#2D9CDB]/10 to-white border-2 border-[#2D9CDB]/60 shadow-lg shadow-[#2D9CDB]/8 md:-translate-y-2"
                  : "glass-card glass-card-hover"
              } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 text-xs font-semibold text-white bg-[#2D9CDB] rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier name */}
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">
                {tier.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-8">
                <span className="font-heading font-bold text-4xl text-slate-900">{tier.price}</span>
                <span className="text-slate-500 text-base">{tier.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={16} className="text-[#2D9CDB] mt-0.5 shrink-0" />
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={tier.ctaHref}
                className={`block text-center py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tier.popular
                    ? "bg-[#2D9CDB] text-white hover:bg-[#2589c4] hover:shadow-lg hover:shadow-[#2D9CDB]/20 btn-live"
                    : "border-2 border-slate-400 text-slate-700 hover:bg-slate-50 hover:border-[#2D9CDB] hover:text-[#1f6fb2] btn-live-outline"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Note */}
        <p
          className={`text-center text-slate-500 text-sm mt-10 transition-all duration-700 delay-500 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          We recommend the right starting point after the strategy call.
        </p>
      </div>
    </section>
  );
}
