"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryImage {
  id: string;
  url: string;
  publicId: string;
  isCover: boolean;
  sortOrder: number;
}

interface GalleryEvent {
  id: string;
  name: string;
  category: string;
  eventDate: Date;
  location: string | null;
  description: string | null;
  isFeatured: boolean;
  images: GalleryImage[];
}

export default function CompanyGallery({ events }: { events: GalleryEvent[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(events.map(e => e.category));
    return ["All", ...Array.from(cats)];
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (selectedCategory === "All") return events;
    return events.filter(e => e.category === selectedCategory);
  }, [events, selectedCategory]);

  const handleOpenLightbox = (event: GalleryEvent) => {
    setSelectedEvent(event);
    setCurrentImageIndex(0);
  };

  const handleCloseLightbox = () => {
    setSelectedEvent(null);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length);
    }
  };

  return (
    <section className="py-24 bg-[#050505] relative min-h-screen">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  selectedCategory === category 
                    ? "bg-primary text-black font-bold" 
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32 auto-rows-[350px]">
          {filteredEvents.length > 0 ? filteredEvents.map((event, idx) => {
            const coverImage = event.images.find(img => img.isCover) || event.images[0];
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx % 8) * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                onClick={() => handleOpenLightbox(event)}
                className={cn(
                  "group relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 cursor-pointer",
                  event.isFeatured ? "sm:col-span-2 sm:row-span-2" : "col-span-1 row-span-1"
                )}
              >
                {/* Image */}
                <div className="absolute inset-0 z-0 bg-[#111]">
                  {coverImage ? (
                    <Image
                      src={coverImage.url}
                      alt={event.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes={event.isFeatured ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 100vw, 25vw"}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-primary font-bold uppercase tracking-widest px-2 py-1 bg-primary/10 border border-primary/20 rounded-md inline-block">
                        {event.category}
                      </span>
                      {event.images.length > 1 && (
                        <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest px-2 py-1 bg-white/10 rounded-md inline-flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" /> {event.images.length}
                        </span>
                      )}
                    </div>
                    <h3 className={cn(
                      "font-heading font-bold text-white leading-tight",
                      event.isFeatured ? "text-3xl" : "text-xl"
                    )}>
                      {event.name}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 line-clamp-2">
                      {event.description || event.location || "View Gallery"}
                    </p>
                  </div>
                </div>

                {/* Premium Glow & Shine */}
                <div className="absolute inset-0 border-2 border-primary/0 rounded-[2rem] group-hover:border-primary/30 group-hover:shadow-[0_0_30px_rgba(250,255,0,0.1)] transition-all duration-500 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
              </motion.div>
            );
          }) : (
            <div className="col-span-full py-20 text-center text-gray-500">
              No gallery events found for this category.
            </div>
          )}
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
              <Link href="/auth/dealer-register" className="border border-primary text-primary font-heading font-bold px-8 py-4 rounded-2xl hover:bg-primary hover:text-black transition-all uppercase tracking-widest text-sm">
                Become a Dealer
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col p-4 md:p-10"
            onClick={handleCloseLightbox}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 z-[110]">
              <div className="text-white">
                <h3 className="text-2xl font-heading font-bold">{selectedEvent.name}</h3>
                {selectedEvent.images.length > 1 && (
                  <p className="text-gray-400 text-sm">
                    Image {currentImageIndex + 1} of {selectedEvent.images.length}
                  </p>
                )}
              </div>
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                onClick={handleCloseLightbox}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Image Viewer */}
            <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
              {selectedEvent.images.length > 0 ? (
                <>
                  <motion.div
                    key={`${selectedEvent.id}-${currentImageIndex}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-full max-w-6xl max-h-[80vh] rounded-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={selectedEvent.images[currentImageIndex].url}
                      alt={selectedEvent.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>

                  {/* Navigation Arrows */}
                  {selectedEvent.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all z-[110]"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all z-[110]"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="text-gray-500">No images available for this event.</div>
              )}
            </div>
            
            {/* Thumbnail Navigation */}
            {selectedEvent.images.length > 1 && (
              <div 
                className="mt-6 flex justify-center gap-2 overflow-x-auto py-2 z-[110]"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedEvent.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={cn(
                      "relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0",
                      currentImageIndex === idx ? "border-primary opacity-100" : "border-transparent opacity-50 hover:opacity-100"
                    )}
                  >
                    <Image src={img.url} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
            
            {/* Description if present */}
            {selectedEvent.description && (
              <div 
                className="absolute bottom-10 left-1/2 -translate-x-1/2 max-w-2xl bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl text-center z-[110]"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-gray-300 text-sm leading-relaxed">{selectedEvent.description}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
