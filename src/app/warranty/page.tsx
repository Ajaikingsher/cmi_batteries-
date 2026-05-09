import type { Metadata } from "next";
import { Shield, CheckCircle, Phone, FileText, AlertTriangle, Clock } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Warranty Policy | Perfect Batteries",
  description: "Understand the warranty terms and conditions for Perfect Batteries products. Learn how to claim warranty and get support.",
};

const warrantyTerms = [
  {
    icon: Shield,
    title: "Battery Warranty Coverage",
    items: [
      "Manufacturing defects in materials and workmanship",
      "Premature capacity loss under normal usage",
      "Defects in the battery casing and terminals",
      "Internal short circuits not caused by misuse",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Warranty Exclusions",
    items: [
      "Physical damage, mishandling, or accidents",
      "Improper installation or usage",
      "Damage from incorrect charger or overcharging",
      "Water ingress or exposure to corrosive substances",
      "Unauthorized repairs or modifications",
    ],
  },
];

export default function WarrantyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <section className="bg-gradient-to-b from-black to-[#0A0A0A] border-b border-white/5 pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-white">Warranty Policy</h1>
          <p className="text-gray-400 mt-3">
            {COMPANY_INFO.brand} stands behind every battery we manufacture. Here&apos;s everything you need to know.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        {/* Warranty periods */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-white mb-6">Warranty Periods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { type: "Lithium Batteries", period: "18 Months", note: "From date of purchase" },
              { type: "Inverter Batteries", period: "24 Months", note: "From date of purchase" },
              { type: "Vehicle Batteries", period: "12 Months", note: "From date of purchase" },
            ].map((w) => (
              <div key={w.type} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <div className="text-3xl font-heading font-bold text-primary mb-1">{w.period}</div>
                <div className="text-white font-medium">{w.type}</div>
                <div className="text-gray-500 text-xs mt-1">{w.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Coverage & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {warrantyTerms.map(({ icon: Icon, title, items }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-white">{title}</h3>
              </div>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Claim process */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-white mb-6">How to Claim Warranty</h2>
          <div className="space-y-4">
            {[
              { step: "01", title: "Gather Documents", desc: "Keep your original purchase invoice, product serial number, and warranty card ready." },
              { step: "02", title: "Contact Support", desc: "Reach us via phone, email, or visit our service center in Coimbatore with the defective battery." },
              { step: "03", title: "Assessment", desc: "Our technical team will inspect the battery and determine if the defect qualifies for warranty." },
              { step: "04", title: "Resolution", desc: "Qualified claims will be resolved within 7 working days — either repaired or replaced." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 font-heading font-bold text-primary text-sm">
                  {step}
                </div>
                <div>
                  <h4 className="font-medium text-white">{title}</h4>
                  <p className="text-gray-400 text-sm mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
          <h3 className="font-heading font-bold text-white text-xl mb-2">Need Warranty Support?</h3>
          <p className="text-gray-400 mb-6">Our team is ready to help you with warranty claims and technical support.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 bg-primary text-black font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-4 h-4" /> Call Us
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 border border-white/20 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/5 transition-colors"
            >
              <FileText className="w-4 h-4" /> Submit Request
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
