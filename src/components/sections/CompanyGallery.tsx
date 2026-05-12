"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const GALLERY_IMAGES = [
  {
    src: "/assets/gallery/s1.png",
    category: "Product Showcase",
    title: "Full Power Range",
    desc: "High-performance lithium battery solutions designed for vehicles, homes, offices, and UPS systems."
  },
  {
    src: "/assets/gallery/s2.png",
    category: "Technical Information",
    title: "Advanced Efficiency",
    desc: "Advanced lithium battery technology with superior efficiency, durability, and long-lasting performance."
  },
  {
    src: "/assets/gallery/s3.png",
    category: "Product Showcase",
    title: "Battery Models",
    desc: "Comprehensive range of models engineered for peak technical excellence and power delivery."
  },
  {
    src: "/assets/gallery/s1.png",
    category: "Business Credentials",
    title: "42+ Years Excellence",
    desc: "42+ years of trusted excellence in delivering reliable power solutions and manufacturing leadership."
  }
];

export default function CompanyGallery() {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-heading font-bold uppercase tracking-[0.3em] text-[10px] mb-4 inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full"
          >
            Showcase
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tighter mb-6 uppercase"
          >
            Gallery <span className="text-primary">Showcase</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            Explore our premium lithium battery solutions, technical highlights, and trusted manufacturing excellence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {GALLERY_IMAGES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage(item.src)}
              className="group relative aspect-[3/4.5] rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 cursor-zoom-in"
            >
              {/* Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                <div className="space-y-2">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-widest px-2 py-1 bg-primary/10 border border-primary/20 rounded-md inline-block">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Premium Glow & Shine */}
              <div className="absolute inset-0 border-2 border-primary/0 rounded-[2rem] group-hover:border-primary/30 group-hover:shadow-[0_0_30px_rgba(250,255,0,0.1)] transition-all duration-500 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] p-12 md:p-20 overflow-hidden bg-gradient-to-b from-primary/10 to-transparent border border-primary/20 text-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-white uppercase tracking-tighter mb-6 leading-tight">
              Looking for Reliable <br />
              <span className="text-primary">Lithium Battery Solutions?</span>
            </h3>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Connect with Chinna Mayil Industries for product inquiries, dealer opportunities, and technical support.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-primary text-black font-heading font-bold px-8 py-4 rounded-2xl hover:bg-white transition-all shadow-xl">
                CONTACT US
              </Link>
              <button className="bg-white/5 border border-white/10 text-white font-heading font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-sm">
                Request Quote
              </button>
              <Link href="/auth/dealer-register" className="border border-primary text-primary font-heading font-bold px-8 py-4 rounded-2xl hover:bg-primary hover:text-black transition-all uppercase tracking-widest text-sm">
                Become a Dealer
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Full View"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

