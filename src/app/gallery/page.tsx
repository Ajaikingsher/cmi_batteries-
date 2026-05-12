import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CompanyGallery from "@/components/sections/CompanyGallery";

export const metadata: Metadata = {
  title: "Gallery | Inside Perfect Batteries",
  description: "Explore our state-of-the-art manufacturing facility and product showcase.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      <CompanyGallery />
      <Footer />
    </main>
  );
}
