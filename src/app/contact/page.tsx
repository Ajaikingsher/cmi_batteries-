"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, ArrowRight, MessageCircle, Globe, MessageSquare, Zap } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20 bg-black">
      <Navbar />
      
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-white">Get in <span className="text-primary">Touch</span></h1>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                  Have questions about our lithium technology? Our engineering and sales team is here to help.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: Phone, label: "Call Us", value: COMPANY_INFO.phone, sub: "Mon-Sat 9am to 6pm" },
                  { icon: Mail, label: "Email Us", value: COMPANY_INFO.email, sub: "Response within 24hrs" },
                  { icon: MapPin, label: "Visit Us", value: "Coimbatore, India", sub: "Factory HQ" },
                  { icon: Clock, label: "Working Hours", value: "9:00 AM - 6:30 PM", sub: "Closed on Sundays" },
                ].map((item, i) => (
                  <div key={i} className="space-y-3 p-6 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-primary/20 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{item.label}</div>
                      <div className="text-white font-bold mt-1">{item.value}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                {[Globe, MessageSquare, Zap].map((Icon, i) => (
                  <Button key={i} variant="outline" size="icon" className="w-14 h-14 rounded-full border-white/10 hover:border-primary hover:text-primary transition-all">
                    <Icon className="w-6 h-6" />
                  </Button>
                ))}
                <Button className="h-14 px-8 rounded-full bg-[#25D366] text-white hover:bg-[#25D366]/90 font-bold gap-2">
                  <MessageCircle className="w-5 h-5 fill-white" /> WhatsApp
                </Button>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-8 md:p-12 relative">
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-50" />
              <form className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <Label className="text-gray-400">Full Name</Label>
                  <Input placeholder="Enter your name" className="bg-white/5 border-white/10 h-12 focus-visible:ring-primary" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-400">Email</Label>
                    <Input type="email" placeholder="email@example.com" className="bg-white/5 border-white/10 h-12 focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-400">Phone</Label>
                    <Input placeholder="+91 00000 00000" className="bg-white/5 border-white/10 h-12 focus-visible:ring-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400">Subject</Label>
                  <Input placeholder="Inquiry about..." className="bg-white/5 border-white/10 h-12 focus-visible:ring-primary" />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400">Message</Label>
                  <Textarea placeholder="How can we help you?" className="bg-white/5 border-white/10 min-h-[150px] focus-visible:ring-primary" />
                </div>
                <Button className="w-full bg-primary text-black font-bold h-14 text-lg hover:bg-primary/90 rounded-2xl group">
                  Send Message <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="h-[400px] bg-white/5 grayscale invert contrast-125 border-y border-white/5">
        <div className="w-full h-full flex items-center justify-center text-gray-500 font-heading uppercase tracking-[0.5em]">
          Interactive Map (Coimbatore Factory)
        </div>
      </section>

      <Footer />
    </main>
  );
}
