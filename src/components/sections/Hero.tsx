"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

const HERO_SLIDES = [
  { src: "/assets/slides/dealers.jpg", name: "Dealers" },
  { src: "/assets/slides/products.jpg", name: "Products" },
  { src: "/assets/slides/services.jpg", name: "Services" }
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 overflow-hidden bg-black">
      {/* Full Width Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={HERO_SLIDES[currentImageIndex].src}
            alt={HERO_SLIDES[currentImageIndex].name}
            className="w-full h-full object-contain brightness-[0.35]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 md:left-8 z-30 p-3 md:p-4 bg-black/50 hover:bg-primary text-white hover:text-black transition-colors rounded-sm backdrop-blur-md"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 md:right-8 z-30 p-3 md:p-4 bg-black/50 hover:bg-primary text-white hover:text-black transition-colors rounded-sm backdrop-blur-md"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Scroll</span>
      </div>
    </section>
  );
}
