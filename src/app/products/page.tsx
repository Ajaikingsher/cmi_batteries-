"use client";

import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import { PRODUCTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Battery, Download, MessageCircle, Filter, ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <main className="min-h-screen pt-20 bg-black">
      <Navbar />
      
      <section className="py-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-20" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">Our <span className="text-primary">Power</span> Solutions</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            High-performance, non-maintenance lithium batteries engineered for vehicles, UPS, and industrial applications.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue="all" className="w-full mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-full">
                <TabsTrigger value="all" className="rounded-full px-8 data-[state=active]:bg-primary data-[state=active]:text-black">All</TabsTrigger>
                <TabsTrigger value="vehicle" className="rounded-full px-8 data-[state=active]:bg-primary data-[state=active]:text-black">Vehicle</TabsTrigger>
                <TabsTrigger value="ups" className="rounded-full px-8 data-[state=active]:bg-primary data-[state=active]:text-black">UPS Systems</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-4">
                <Button variant="outline" className="border-white/10 text-white rounded-full">
                  <Download className="mr-2 w-4 h-4" /> Brochure
                </Button>
                <Button className="bg-primary text-black rounded-full font-bold">
                  Compare Models
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="group bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-8 hover:border-primary/50 transition-all flex flex-col">
                  <div className="relative aspect-square mb-8 bg-[#111] rounded-[2rem] flex items-center justify-center overflow-hidden">
                    <Image src={product.image} alt={product.name} width={300} height={300} className="object-contain group-hover:scale-110 transition-transform duration-500" />
                    <Badge className="absolute top-4 left-4 bg-primary text-black font-bold border-none">LITHIUM-ION</Badge>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-white mb-2">{product.name}</h3>
                      <p className="text-gray-500 text-sm">{product.specs.application}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-y-4">
                      <div className="space-y-1">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Voltage</div>
                        <div className="text-lg font-bold text-white flex items-center gap-2">
                          <Battery className="w-4 h-4 text-primary" /> {product.specs.voltage}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Capacity</div>
                        <div className="text-lg font-bold text-white flex items-center gap-2">
                          <Zap className="w-4 h-4 text-primary" /> {product.specs.capacity}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex gap-3">
                      <Button className="flex-1 bg-white/5 hover:bg-primary hover:text-black border-white/10">Inquiry</Button>
                      <Button size="icon" className="bg-[#25D366] text-white hover:bg-[#25D366]/80 shrink-0">
                        <MessageCircle className="w-5 h-5 fill-white" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs>
        </div>
      </section>

      <Footer />
    </main>
  );
}
