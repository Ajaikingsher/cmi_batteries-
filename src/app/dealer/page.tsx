"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Handshake, TrendingUp, ShieldCheck, Globe, Zap, ArrowRight } from "lucide-react";

const BENEFITS = [
  { title: "High Margins", desc: "Industry-leading profit margins on all lithium product lines.", icon: TrendingUp },
  { title: "Brand Support", desc: "Comprehensive marketing and branding support for your outlet.", icon: Handshake },
  { title: "Technical Training", desc: "Expert training for your staff on lithium technology and service.", icon: Zap },
  { title: "Exclusive Territory", desc: "Secure your region with our exclusive dealer protection policy.", icon: Globe },
];

export default function DealerPage() {
  return (
    <main className="min-h-screen pt-20 bg-black">
      <Navbar />
      
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-heading font-bold text-white">
                Join the <span className="text-primary">Perfect</span> <br /> Dealer Network
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                Partner with South India's leading lithium battery manufacturer. We are expanding our footprint and looking for passionate partners to drive the future of energy.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                {BENEFITS.map((benefit, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <benefit.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">{benefit.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#0A0A0A] border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl relative"
            >
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-heading font-bold text-white mb-2">Dealer Inquiry</h3>
                <p className="text-gray-500 text-sm mb-8">Fill out the form below and our partnership team will reach out within 24 hours.</p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-400">Full Name</Label>
                      <Input id="name" placeholder="John Doe" className="bg-white/5 border-white/10 focus-visible:ring-primary" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-400">Phone Number</Label>
                      <Input id="phone" placeholder="+91 90000 00000" className="bg-white/5 border-white/10 focus-visible:ring-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-400">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-400">Preferred Location</Label>
                    <Input id="location" placeholder="City, State" className="bg-white/5 border-white/10 focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-400">Brief about your experience</Label>
                    <Textarea id="message" placeholder="Tell us about your current business..." className="bg-white/5 border-white/10 focus-visible:ring-primary min-h-[100px]" />
                  </div>
                  <Button className="w-full bg-primary text-black font-bold h-12 text-lg hover:bg-primary/90 mt-4 group">
                    Apply Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
