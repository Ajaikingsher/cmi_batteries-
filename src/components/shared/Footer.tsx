import React from "react";
import Link from "next/link";
import { Zap, Globe, MessageSquare, Mail, Phone, MapPin } from "lucide-react";
import { COMPANY_INFO, NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Zap className="w-8 h-8 text-primary fill-primary" />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl tracking-tighter leading-none">
                  PERFECT
                </span>
                <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase leading-none">
                  BATTERIES
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Leading lithium battery manufacturer based in Coimbatore delivering high-performance, eco-friendly, long-life battery solutions for the next generation.
            </p>
            <div className="flex gap-4">
              {[Globe, MessageSquare, Zap].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-6 text-white uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-4">
              {NAV_LINKS.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-6 text-white uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex gap-3 text-sm text-gray-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>{COMPANY_INFO.phone}</span>
              </li>
              <li className="flex gap-3 text-sm text-gray-400">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-6 text-white uppercase tracking-wider text-sm">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe for latest battery tech updates.</p>
            <div className="flex gap-2">
              <Input placeholder="Your Email" className="bg-white/5 border-white/10 focus-visible:ring-primary" />
              <Button size="icon" className="bg-primary text-black hover:bg-primary/90 shrink-0">
                <Zap className="w-4 h-4 fill-black" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. Designed for the Future.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-gray-500 hover:text-gray-300 text-xs">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-gray-300 text-xs">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
