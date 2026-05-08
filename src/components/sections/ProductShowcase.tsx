"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Zap } from "lucide-react";
import Link from "next/link";

export default function ProductShowcase() {
  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-primary font-heading font-bold uppercase tracking-widest text-sm">Product Lineup</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-white">Power Solutions for Every Need</h3>
            <p className="text-gray-400">From lightweight vehicle batteries to high-capacity UPS systems, our CMIP series delivers consistent performance.</p>
          </div>
          <Link href="/products" className="text-primary p-0 h-auto font-bold group inline-flex items-center">
            View All Products <ArrowUpRight className="ml-1 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl bg-[#111] border border-white/5 p-6 hover:border-primary/30 transition-all"
            >
              <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl bg-black flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary fill-primary" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-heading font-bold text-white group-hover:text-primary transition-colors">{product.name}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{product.specs.type}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-4">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 uppercase">Voltage</div>
                    <div className="text-sm font-bold text-white">{product.specs.voltage}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 uppercase">Capacity</div>
                    <div className="text-sm font-bold text-white">{product.specs.capacity}</div>
                  </div>
                </div>

                <Button className="w-full bg-white/5 hover:bg-primary hover:text-black text-white font-bold transition-all border border-white/10 hover:border-primary">
                  Learn More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
