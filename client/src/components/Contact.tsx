/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * Final CTA section with contact form
 * CTA background image, form with dark inputs
 */
import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  revenue: string;
}

const CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663516046814/8JP5W7DRbnVDHn5RhMag6U/cta-bg-VsRGCgkMryU8Q9vF7Sqsbq.webp";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const phoneNote = formData.phone.trim() ? ` | Phone: ${formData.phone.trim()}` : "";
      const contactPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company,
        revenue: `${formData.revenue}${phoneNote}`,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactPayload),
      });

      if (!response.ok) {
        let errorMessage = "";
        try {
          const errorBody = await response.json();
          errorMessage = errorBody?.error || "";
        } catch {
          errorMessage = "";
        }

        throw new Error(errorMessage || "Failed to submit contact form");
      }

      setSubmitted(true);
      toast.success("Strategy call request received. We'll be in touch within 24 hours.");
    } catch {
      toast.error("Something went wrong. Email kenneth.r.valentine@gmail.com and we’ll get you scheduled.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses =
    "w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#2D9CDB]/50 focus:ring-1 focus:ring-[#2D9CDB]/30 transition-all";

  return (
    <section id="contact" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${CTA_BG})` }}
      />
      <div className="absolute inset-0 bg-[#F7F4EF]/92" />

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
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight mb-6">
              Ready to Add an AI Office Employee Without Adding Payroll?
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-md">
              Book a strategy call. We’ll identify the role, the bottleneck, and the workflow your synthetic employee should take over.
            </p>

            {/* Phone */}
            <div className="mb-6 p-4 rounded-xl border border-slate-200 bg-white/60">
              <p className="text-slate-500 text-xs font-medium tracking-wide uppercase mb-1">Call or text</p>
              <a
                href="tel:+14707529092"
                className="text-lg font-heading font-bold text-slate-900 hover:text-[#1f6fb2] transition-colors"
              >
                (470) 752-9092
              </a>
              <p className="text-slate-500 text-xs mt-1">Speak with our team or leave a message for a callback.</p>
            </div>

            {/* Trust signals */}
            <div className="space-y-3">
              {[
                "Built around the role you actually need filled",
                "Works with your current CRM and workflow",
                "Focused on lower overhead, cleaner follow-up, and more booked jobs",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-[#2D9CDB] shrink-0" />
                  <span className="text-slate-600 text-sm">{item}</span>
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
                <h3 className="font-heading font-bold text-2xl text-slate-900 mb-3">
                  Strategy Call Request Received
                </h3>
                <p className="text-slate-600 text-sm">
                  We'll reach out within 24 hours to schedule the call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8 space-y-5">
                <div className="mb-2">
                  <h3 className="font-heading font-bold text-xl text-slate-900">Book Your Strategy Call</h3>
                  <p className="text-slate-500 text-sm mt-1">Tell us what office work is getting dropped or costing too much.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 text-xs font-medium mb-2">First Name</label>
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
                    <label className="block text-slate-600 text-xs font-medium mb-2">Last Name</label>
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
                  <label className="block text-slate-600 text-xs font-medium mb-2">Email</label>
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
                  <label className="block text-slate-600 text-xs font-medium mb-2">Phone</label>
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
                  <label className="block text-slate-600 text-xs font-medium mb-2">Company Name</label>
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
                  <label className="block text-slate-600 text-xs font-medium mb-2">Monthly Revenue</label>
                  <select
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none`}
                  >
                    <option value="" className="bg-white text-slate-900">Select range...</option>
                    <option value="under-500k" className="bg-white text-slate-900">Under $500K</option>
                    <option value="500k-2m" className="bg-white text-slate-900">$500K – $2M</option>
                    <option value="2m-plus" className="bg-white text-slate-900">$2M+</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#1f6fb2] hover:bg-[#18639e] disabled:bg-[#2D9CDB]/60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 shadow-sm btn-live group"
                >
                  {submitting ? "Submitting..." : "Book My Strategy Call"}
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
