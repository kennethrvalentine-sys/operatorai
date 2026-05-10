/*
 * DESIGN: Signal & Noise — thin strip with 3 stats, animated counters
 * More visible: slightly brighter background, stronger border, bigger text
 */
import { useEffect, useRef, useState } from "react";
import { Clock, PhoneOff, Workflow } from "lucide-react";

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function Stat({ icon, value, label }: StatProps) {
  return (
    <div className="flex items-center gap-4 py-6 px-4">
      <div className="w-10 h-10 rounded-lg bg-[#2D9CDB]/10 border border-[#2D9CDB]/20 flex items-center justify-center text-[#2D9CDB] shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-slate-900 font-heading font-bold text-lg sm:text-xl leading-tight">{value}</div>
        <div className="text-slate-500 text-xs sm:text-sm mt-0.5">{label}</div>
      </div>
    </div>
  );
}

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
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
    <div
      ref={ref}
      className={`relative bg-white border-y border-slate-200 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#2D9CDB]/20 to-transparent" />
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          <Stat
            icon={<Clock size={20} />}
            value="Faster Response"
            label="Before leads cool off"
          />
          <Stat
            icon={<Workflow size={20} />}
            value="Cleaner Pipeline"
            label="So follow-up stops slipping"
          />
          <Stat
            icon={<PhoneOff size={20} />}
            value="Fewer Missed Opportunities"
            label="After hours and during storm spikes"
          />
        </div>
      </div>
    </div>
  );
}
