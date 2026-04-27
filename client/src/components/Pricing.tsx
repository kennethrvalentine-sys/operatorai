/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * 3 pricing cards, middle one highlighted as "Most Popular"
 * Glass card style, blue accent on popular tier
 */
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$497",
    period: "/mo",
    popular: false,
    features: [
      "AI Lead Follow-Up System",
      "Instant text + email response to new leads",
      "Automated estimate booking",
      "Weekly pipeline report",
    ],
    cta: "Get Started",
    ctaHref: "#contact",
  },
  {
    name: "Growth",
    price: "$997",
    period: "/mo",
    popular: true,
    features: [
      "Everything in Starter",
      "AI Content Engine (Google, Facebook, email)",
      "Reputation management (automated review requests)",
      "GoHighLevel CRM setup",
      "Bi-weekly strategy call",
    ],
    cta: "Get Started",
    ctaHref: "#contact",
  },
  {
    name: "Full Stack",
    price: "$1,997",
    period: "/mo",
    popular: false,
    features: [
      "Everything in Growth",
      "Full Operations Stack buildout",
      "Power dialer integration",
      "Insurance job workflow automation",
      "Dedicated account manager",
      "Weekly reporting dashboard",
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
    <section id="pricing" ref={ref} className="py-24 lg:py-32 bg-[#0D0D0D]">
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
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            Pick Your Stack
          </h2>
          <p className="text-white/50 text-lg mt-4 max-w-lg mx-auto">
            Cancel anytime. No setup fees. Most clients go live in under 2 weeks.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`relative rounded-xl p-8 transition-all duration-700 hover:scale-[1.02] ${
                tier.popular
                  ? "bg-gradient-to-b from-[#2D9CDB]/10 to-transparent border-2 border-[#2D9CDB]/30 shadow-lg shadow-[#2D9CDB]/5 md:-translate-y-2"
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
              <h3 className="font-heading font-bold text-lg text-white mb-4">
                {tier.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-8">
                <span className="font-heading font-bold text-4xl text-white">{tier.price}</span>
                <span className="text-white/40 text-base">{tier.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={16} className="text-[#2D9CDB] mt-0.5 shrink-0" />
                    <span className="text-white/60 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={tier.ctaHref}
                className={`block text-center py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tier.popular
                    ? "bg-[#2D9CDB] text-white hover:bg-[#2589c4] hover:shadow-lg hover:shadow-[#2D9CDB]/20"
                    : "border border-white/10 text-white/80 hover:bg-white/5 hover:border-white/20"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Note */}
        <p
          className={`text-center text-white/30 text-sm mt-10 transition-all duration-700 delay-500 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          Ad spend not included. All plans include full onboarding and 30-day optimization period.
        </p>
      </div>
    </section>
  );
}
