"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Zap } from "lucide-react";
import { NAV_LINKS, COMPANY_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/10 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <Image
              src={COMPANY_INFO.logo}
              alt="CMI Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl tracking-tighter leading-none text-white">
              PERFECT
            </span>
            <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase leading-none">
              BATTERIES
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative group",
                pathname === link.href ? "text-primary" : "text-white/70"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full",
                pathname === link.href ? "w-full" : ""
              )} />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-black">
            Dealer Login
          </Button>
          <Button className="bg-primary text-black hover:bg-primary/90 font-bold">
            Request Quote
          </Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="lg:hidden text-white" />
            }
          >
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-black border-white/10 text-white w-[300px]">
            <div className="flex flex-col gap-8 mt-12">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xl font-heading font-bold transition-colors hover:text-primary flex items-center justify-between",
                    pathname === link.href ? "text-primary" : "text-white/70"
                  )}
                >
                  {link.name}
                  <ChevronRight className="w-5 h-5 text-primary" />
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-8">
                <Button className="bg-primary text-black w-full font-bold">
                  Request Quote
                </Button>
                <Button variant="outline" className="border-primary/50 text-primary w-full">
                  Dealer Registration
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
