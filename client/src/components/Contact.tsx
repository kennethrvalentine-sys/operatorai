/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * Final CTA section with contact form
 * CTA background image, form with dark inputs
 */
import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663516046814/8JP5W7DRbnVDHn5RhMag6U/cta-bg-VsRGCgkMryU8Q9vF7Sqsbq.webp";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    revenue: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — will wire to GoHighLevel
    setSubmitted(true);
    toast.success("Demo request received! We'll be in touch within 24 hours.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#2D9CDB]/50 focus:ring-1 focus:ring-[#2D9CDB]/30 transition-all";

  return (
    <section id="contact" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${CTA_BG})` }}
      />
      <div className="absolute inset-0 bg-[#0A0A0A]/85" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: CTA Text */}
          <div
            className={`transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="text-[#2D9CDB] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
              Get Started
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
              Ready to Stop Following Up Manually?
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-md">
              Book a free 20-minute demo. We'll show you exactly what your system would look like.
            </p>

            {/* Trust signals */}
            <div className="space-y-3">
              {[
                "We respond within 24 hours",
                "No pressure. No pitch deck.",
                "Custom system walkthrough",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-[#2D9CDB] shrink-0" />
                  <span className="text-white/40 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {submitted ? (
              <div className="glass-card rounded-xl p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#2D9CDB]/10 border border-[#2D9CDB]/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-[#2D9CDB]" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-white mb-3">
                  Demo Request Received
                </h3>
                <p className="text-white/50 text-sm">
                  We'll reach out within 24 hours to schedule your walkthrough.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8 space-y-5">
                <div className="mb-2">
                  <h3 className="font-heading font-bold text-xl text-white">Book Your Demo</h3>
                  <p className="text-white/30 text-sm mt-1">Takes 30 seconds. We'll handle the rest.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Smith"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-xs font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@roofingco.com"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="block text-white/50 text-xs font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="block text-white/50 text-xs font-medium mb-2">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="ABC Roofing"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="block text-white/50 text-xs font-medium mb-2">Monthly Revenue</label>
                  <select
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none`}
                  >
                    <option value="" className="bg-[#111]">Select range...</option>
                    <option value="under-500k" className="bg-[#111]">Under $500K</option>
                    <option value="500k-2m" className="bg-[#111]">$500K – $2M</option>
                    <option value="2m-plus" className="bg-[#111]">$2M+</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#2D9CDB] hover:bg-[#2589c4] text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#2D9CDB]/20 group"
                >
                  Book My Free Demo
                  <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
