/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * Hero: badge, large headline with gradient text, subheadline, two CTAs
 * Left-aligned text, right side shows dashboard mockup image
 * Background: generated hero-bg image
 */
import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import AnimatedGrid from "./AnimatedGrid";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663516046814/8JP5W7DRbnVDHn5RhMag6U/hero-bg-buvfExsHX4jBxJqk7rgHxx.webp";
const DASHBOARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663516046814/8JP5W7DRbnVDHn5RhMag6U/system-status-panel-oK4dmwsKtCjdZUQhVk9jZE.webp";

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
      {/* Animated grid overlay */}
      <AnimatedGrid />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-[#0A0A0A]/60 to-[#0A0A0A]" />

      <div className="container relative z-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2D9CDB]/30 bg-[#2D9CDB]/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#2D9CDB] animate-pulse" />
              <span className="text-sm text-[#2D9CDB] font-medium">
                Now Accepting New Roofing Clients
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] leading-[1.08] tracking-tight text-white mb-6">
              Your Roofing Business,{" "}
              <span className="gradient-text">Fully Automated.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">
              OperatorAI builds AI-powered systems that handle your lead follow-up, content, and operations — so you can focus on running crews and closing jobs.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#2D9CDB] hover:bg-[#2589c4] rounded-lg transition-all duration-200 hover:shadow-xl hover:shadow-[#2D9CDB]/25 group"
              >
                Book a Free Demo
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#what-we-build"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-medium text-white/80 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                See What We Build
                <ChevronDown size={18} />
              </a>
            </div>
          </div>

          {/* Right: Dashboard Image */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-[#2D9CDB]/10">
              <img
                src={DASHBOARD_IMG}
                alt="OperatorAI Dashboard showing AI automation metrics"
                className="w-full h-auto"
                loading="eager"
              />
              {/* Subtle overlay to blend edges */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/30 to-transparent pointer-events-none" />
            </div>
            {/* Floating glow effect behind */}
            <div className="absolute -inset-4 bg-[#2D9CDB]/5 rounded-2xl blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
