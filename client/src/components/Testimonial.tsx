/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * Single featured testimonial quote — large, centered, with attribution
 * Adds social proof and credibility between roofing section and pricing
 */
import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";

export default function Testimonial() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 lg:py-28">
      <div className="container max-w-4xl mx-auto">
        <div
          className={`text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Quote icon */}
          <div className="w-12 h-12 rounded-full bg-[#2D9CDB]/10 border border-[#2D9CDB]/20 flex items-center justify-center mx-auto mb-8">
            <Quote size={20} className="text-[#2D9CDB]" />
          </div>

          {/* Quote */}
          <blockquote className="font-heading text-2xl sm:text-3xl lg:text-4xl font-medium text-white/90 leading-snug mb-8">
            "We went from losing half our storm leads to booking 80% of them within 48 hours. OperatorAI changed how we run our business."
          </blockquote>

          {/* Attribution */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2D9CDB]/20 flex items-center justify-center">
              <span className="text-[#2D9CDB] font-heading font-bold text-sm">MR</span>
            </div>
            <div className="text-left">
              <p className="text-white/80 text-sm font-medium">Mike R.</p>
              <p className="text-white/30 text-xs">Owner, Summit Roofing — Dallas, TX</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
