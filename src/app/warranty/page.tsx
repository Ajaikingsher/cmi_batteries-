"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Zap, Search, FileText, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function WarrantyPage() {
  return (
    <main className="min-h-screen pt-20 bg-black">
      <Navbar />
      
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h1 className="text-5xl font-heading font-bold text-white">Warranty <span className="text-primary">Registration</span></h1>
              <p className="text-gray-400 text-lg">Secure your investment. Register your Perfect Lithium battery for an extended service warranty of up to 60 months.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <Card className="bg-[#0A0A0A] border-white/5 p-6 hover:border-primary/20 transition-all">
                <CardContent className="p-0 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-white uppercase text-sm tracking-wider">Extended Protection</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">24 Months standard + 36 months service support on all CMIP series.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-[#0A0A0A] border-white/5 p-6 hover:border-primary/20 transition-all">
                <CardContent className="p-0 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-white uppercase text-sm tracking-wider">Direct Service</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">Priority support and direct factory service for registered customers.</p>
                </CardContent>
              </Card>

              <Card className="bg-[#0A0A0A] border-white/5 p-6 hover:border-primary/20 transition-all">
                <CardContent className="p-0 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-white uppercase text-sm tracking-wider">Easy Status</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">Track your battery health and warranty status anytime via our portal.</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
              
              <form className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Product Serial Number</Label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input placeholder="Enter Serial No. (e.g. CMIP1212-XXXX)" className="pl-12 bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-primary" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Purchase Date</Label>
                    <Input type="date" className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-primary" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Customer Name</Label>
                    <Input placeholder="Full Name" className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Phone Number</Label>
                    <Input placeholder="Mobile No." className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-primary" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Dealer Name / City</Label>
                  <Input placeholder="Where did you buy it?" className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-primary" />
                </div>

                <div className="pt-4 flex flex-col items-center gap-4">
                  <Button className="w-full md:w-auto px-12 h-14 bg-primary text-black font-bold text-lg rounded-full hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(250,255,0,0.2)]">
                    Register Warranty
                  </Button>
                  <p className="text-xs text-gray-500 flex items-center gap-2">
                    <FileText className="w-3 h-3" /> By clicking, you agree to our Terms and Conditions
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
