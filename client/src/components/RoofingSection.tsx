/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * Roofing-specific section with topographic background
 * 3 columns, bold labels, short copy, no icons
 */
import { useEffect, useRef, useState } from "react";
import { BadgeDollarSign, Building2, Headset } from "lucide-react";

const ROOFING_BG = "/hero-bg-roofing-office.png";
const ROOFING_WORKFLOW = "/storm-season-coverage.png";

const features = [
  {
    label: "Storm-Season Coverage",
    description:
      "When hail hits and the phone lights up, your synthetic employee keeps answering, routing, and following up so storm leads do not die in the chaos.",
  },
  {
    label: "Pipeline & Estimate Follow-Up",
    description:
      "The biggest leak is often between first contact and signed job. We build synthetic employees that keep estimates, reminders, and next steps moving.",
  },
  {
    label: "Roofing Workflow Awareness",
    description:
      "Insurance volume, retail consistency, missed calls, CRM neglect, supplement lag — roofing has its own operational mess. We build for that reality.",
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
      <div className="absolute inset-0 bg-[#F7F4EF]/88" />

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
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight max-w-3xl">
            We Build AI Employees for the Way Roofing Companies Actually Operate.
          </h2>
          <p className="text-slate-600 text-lg mt-4 max-w-3xl">
            Roofers do not need generic automation. They need office help that can answer calls, work the CRM, follow up with customers, and keep jobs moving without adding expensive headcount.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {features.map((feature, i) => (
              <div
                key={feature.label}
                className={`transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                <div className="w-10 h-0.5 bg-[#2D9CDB] mb-5" />
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-3">
                  {feature.label}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div
            className={`rounded-2xl border border-slate-200 bg-white/92 backdrop-blur-sm p-6 shadow-sm transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="rounded-xl overflow-hidden border border-slate-200 mb-5">
              <img
                src={ROOFING_WORKFLOW}
                alt="Roofing workflow, CRM, and office operations"
                className="w-full h-40 object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-[#2D9CDB] text-xs font-semibold tracking-[0.2em] uppercase mb-5">What the role replaces</p>
            <div className="space-y-4">
              {[
                {
                  icon: <Headset size={18} />,
                  title: "Missed-call chaos",
                  text: "Answers, routes, and follows up when the office is slammed.",
                },
                {
                  icon: <Building2 size={18} />,
                  title: "CRM neglect",
                  text: "Keeps records updated and jobs moving through the system.",
                },
                {
                  icon: <BadgeDollarSign size={18} />,
                  title: "Expensive admin drift",
                  text: "Takes repetitive office work off your payroll growth path.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="w-9 h-9 rounded-lg bg-[#2D9CDB]/15 border border-[#2D9CDB]/25 flex items-center justify-center text-[#2D9CDB] shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-slate-900 font-medium text-sm">{item.title}</p>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div
          className={`mt-16 pt-8 border-t border-white/5 transition-all duration-700 delay-500 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-slate-500 text-sm tracking-wide">
            Roofing first. Adjacent trades accepted selectively, but not marketed.
          </p>
        </div>
      </div>
    </section>
  );
}
