/*
 * DESIGN: Signal & Noise — Data-Driven Dark Interface
 * Home page: assembles all sections + nav + footer
 * Background: #0A0A0A base, sections alternate between base and slightly lighter
 */
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import WhatWeBuild from "@/components/WhatWeBuild";
import HowItWorks from "@/components/HowItWorks";
import RoofingSection from "@/components/RoofingSection";
import Testimonial from "@/components/Testimonial";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <Hero />
      <SocialProof />
      <WhatWeBuild />
      <HowItWorks />
      <RoofingSection />
      <Testimonial />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
