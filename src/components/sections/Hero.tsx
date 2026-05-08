"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGES = [
  "/assets/batt1-removebg-preview.png",
  "/assets/batt2-removebg-preview.png",
  "/assets/inverter.png"
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const batteryRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(batteryRef.current, {
        y: -30,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "power1.inOut",
      });

      gsap.from(".hero-content > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-grid">
      {/* Background Glow */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="hero-content space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest animate-pulse">
            <Zap className="w-4 h-4 fill-primary" />
            42 Years of Manufacturing Excellence
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight tracking-tighter">
            Next-Generation <br />
            <span className="text-primary neon-glow">Lithium Battery</span> <br />
            Technology
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
            Power Your Ride with High-Performance Non-Maintenance Lithium Batteries Built by Chinna Mayil Industries. Engineered for the future of mobility.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Button className="bg-primary text-black hover:bg-primary/90 h-14 px-8 text-lg font-bold group">
              Explore Products
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="border-white/10 hover:bg-white/5 h-14 px-8 text-lg font-bold">
              Become Dealer
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
            {[
              { label: "Charge Cycles", value: "5000+" },
              { label: "Efficiency", value: "95%" },
              { label: "Experience", value: "42 Yrs" },
              { label: "Warranty", value: "5 Yrs" },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-2xl font-heading font-bold text-white">{stat.value}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <div ref={batteryRef} className="relative z-20 w-full max-w-[500px] aspect-square">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotateY: -10 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src={HERO_IMAGES[currentImageIndex]}
                  alt="Perfect Lithium Battery"
                  fill
                  className="object-contain drop-shadow-[0_0_50px_rgba(250,255,0,0.3)]"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Floating Particle Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 border border-primary/20 rounded-full animate-spin-slow blur-sm" />
          <div className="absolute bottom-10 left-0 w-24 h-24 border border-primary/10 rounded-full animate-reverse-spin blur-sm" />
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
      </div>
    </section>
  );
}
