import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import { COMPANY_INFO } from "@/lib/constants";
import { Target, Eye, Award, Users, Factory, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
          <Image src="/assets/batt2-removebg-preview.png" alt="Factory" fill className="object-contain" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="text-primary font-bold uppercase tracking-widest text-sm">Our Legacy</div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight">
              42 Years of <br />
              <span className="text-primary neon-glow">Manufacturing Mastery</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              {COMPANY_INFO.name} is a leading lithium battery manufacturer based in Coimbatore, delivering high-performance, eco-friendly, long-life battery solutions for vehicles, homes, offices, and UPS systems.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-white/5 bg-[#050505]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Years Experience", value: "42+", icon: Award },
              { label: "Dealers Nationwide", value: "500+", icon: Users },
              { label: "Batteries Sold", value: "100k+", icon: Zap },
              { label: "Manufacturing Units", value: "3", icon: Factory },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-4xl font-heading font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 bg-white">
              <Image src="/assets/refer.jpeg" alt="Technical Specifications" fill className="object-contain p-4" />
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Innovation Journey</h2>
              <div className="space-y-6 text-gray-400 leading-relaxed">
                <p>
                  From our humble beginnings in 1982 to becoming a pioneer in lithium technology, our journey has always been driven by one goal: Powering Your Ride with precision.
                </p>
                <p>
                  Based in the industrial heart of Coimbatore, Tamil Nadu, we have evolved through four decades of battery technology transitions—from traditional lead-acid to the next-generation lithium-ion solutions we lead today.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Target className="w-6 h-6" />
                    <h4 className="font-heading font-bold text-white">Our Mission</h4>
                  </div>
                  <p className="text-sm text-gray-500">To accelerate the transition to sustainable energy through high-performance battery technology.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Eye className="w-6 h-6" />
                    <h4 className="font-heading font-bold text-white">Our Vision</h4>
                  </div>
                  <p className="text-sm text-gray-500">To be the global benchmark for reliability and innovation in energy storage solutions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
