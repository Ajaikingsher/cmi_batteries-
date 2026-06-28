"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, ShoppingCart, User, LogOut, LayoutDashboard } from "lucide-react";
import { NAV_LINKS, COMPANY_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/store/cart";
import { motion, AnimatePresence } from "framer-motion";

const PUBLIC_NAV = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Warranty", href: "/warranty" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSplash, setIsSplash] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { data: session } = useSession();
  const { totalItems } = useCart();

  useEffect(() => {
    setMounted(true);

    // Only show splash screen on the Home page, and only once per session
    if (window.location.pathname === "/") {
      const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
      if (hasSeenSplash) {
        setIsSplash(false);
      } else {
        sessionStorage.setItem("hasSeenSplash", "true");
        setTimeout(() => setIsSplash(false), 2200);
      }
    } else {
      setIsSplash(false);
    }

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  const dashboardHref =
    session?.user?.role === "ADMIN"
      ? "/admin"
      : session?.user?.role === "DEALER"
        ? "/dealer"
        : "/customer";

  return (
    <>
      <AnimatePresence>
        {isSplash && mounted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div layoutId="logo-image" className="relative w-48 h-48">
                <img src={COMPANY_INFO.logo} alt="CMI Logo" className="object-contain w-full h-full" />
              </motion.div>
              <motion.div layoutId="logo-text" className="flex flex-col items-center text-center">
                <span className="font-heading font-bold text-6xl tracking-tighter leading-none text-white">PERFECT</span>
                <span className="text-xl mt-3 text-primary font-bold tracking-[0.2em] uppercase leading-none">BATTERIES</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-black border-b border-white/10 py-3"
            : "bg-black/90 py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-6">
            <motion.div layoutId="logo-image" className="relative w-14 h-14 md:w-28 md:h-28">
              <img src={COMPANY_INFO.logo} alt="CMI Logo" className="object-contain w-full h-full" />
            </motion.div>
            <motion.div layoutId="logo-text" className="flex flex-col">
              <span className="font-heading font-bold text-2xl md:text-4xl tracking-tighter leading-none text-white">PERFECT</span>
              <span className="text-xs md:text-base mt-1 text-primary font-bold tracking-[0.2em] uppercase leading-none">BATTERIES</span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {PUBLIC_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  pathname === link.href ? "text-primary" : "text-white/70"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full",
                    pathname === link.href ? "w-full" : ""
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20 overflow-hidden"
                >
                  {session.user.image ? (
                    <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-gray-300" />
                  )}
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-56 bg-[#111] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-white/10 mb-2">
                        <p className="text-white text-sm font-bold truncate">
                          {session.user.name || "User"}
                        </p>
                        <p className="text-gray-400 text-xs truncate mt-0.5">
                          {session.user.email}
                        </p>
                      </div>

                      <Link
                        href={dashboardHref}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-primary" />
                        Dashboard
                      </Link>

                      <div className="h-px bg-white/10 my-2" />

                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors px-3 py-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/dealer-register"
                  className="bg-primary text-black font-heading font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Become a Dealer
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <Link href="/cart" className="relative text-gray-300">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-white/10 px-4 py-6 space-y-4">
            {PUBLIC_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between text-lg font-heading font-bold py-2 transition-colors",
                  pathname === link.href ? "text-primary" : "text-white/80 hover:text-primary"
                )}
              >
                {link.name}
                <ChevronRight className="w-4 h-4" />
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-3">
              {session?.user ? (
                <>
                  <Link href={dashboardHref} className="flex items-center gap-2 text-white font-medium py-2">
                    <LayoutDashboard className="w-4 h-4 text-primary" /> Dashboard
                  </Link>
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-2 text-red-400 font-medium py-2">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block text-white font-medium py-2">Sign In</Link>
                  <Link href="/auth/dealer-register" className="block w-full bg-primary text-black font-bold py-3 rounded-xl text-center hover:bg-primary/90 transition-colors">
                    Become a Dealer
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
