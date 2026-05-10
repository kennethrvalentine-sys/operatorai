/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * Section label in uppercase blue, large headline, 3 glass cards with icons
 * Bento-grid inspired layout, glass-card style
 */
import { useEffect, useRef, useState } from "react";
import { Bot, PhoneCall, Workflow } from "lucide-react";

const SECTION_IMAGE = "/section-ai-office-employee.png";

const products = [
  {
    icon: <PhoneCall size={28} />,
    name: "AI Front Desk Employee",
    tagline: "Answers calls. Responds fast. Books estimates.",
    description:
      "We build a synthetic front-desk employee that answers missed calls, responds to new leads, follows up by text and email, and keeps opportunities from going cold.",
    price: "Starts at $497/mo",
  },
  {
    icon: <Workflow size={28} />,
    name: "AI CRM & Back-Office Employee",
    tagline: "Works inside the systems you already use.",
    description:
      "Your synthetic employee can work inside platforms like AccuLynx, JobNimbus, Salesforce, and similar tools to update records, move jobs through the pipeline, send reminders, and handle repetitive admin work.",
    price: "Starts at $997/mo",
  },
  {
    icon: <Bot size={28} />,
    name: "Custom Synthetic Employee",
    tagline: "Built around your office bottlenecks.",
    description:
      "Need help with estimating follow-up, customer contact, scheduling, pipeline cleanup, or overflow calls during storm season? We build the role around the work you need off your plate.",
    price: "Custom scope",
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
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight max-w-3xl">
            The Synthetic Employees We Build for Roofers
          </h2>
          <p className="text-slate-600 text-lg mt-4 max-w-3xl">
            These are AI office employees built to reduce admin overload, protect leads, and help you grow without rushing into another payroll hire.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 mb-10 items-stretch">
          <div
            className={`rounded-2xl overflow-hidden border border-slate-200 shadow-sm min-h-[340px] transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            <img
              src={SECTION_IMAGE}
              alt="AI office employee for a roofing company"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div
            className={`glass-card rounded-2xl p-8 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "260ms" }}
          >
            <span className="text-[#2D9CDB] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
              What this gives you
            </span>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 leading-tight mb-5">
              Office coverage without rushing into another full-time hire.
            </h3>
            <div className="space-y-4">
              {[
                "Someone answers faster when leads come in.",
                "Someone keeps the CRM updated and jobs moving.",
                "Someone follows up when your team is too busy to chase it.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2D9CDB] mt-1.5 shrink-0" />
                  <p className="text-slate-700 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
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
              <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">
                {product.name}
              </h3>
              <p className="text-[#2D9CDB] text-sm font-medium mb-4">
                {product.tagline}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
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
