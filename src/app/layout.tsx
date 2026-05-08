import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Perfect Batteries | Next-Generation Lithium Technology",
  description: "Power Your Ride with High-Performance Non-Maintenance Lithium Batteries Built by Chinna Mayil Industries.",
  keywords: ["Lithium Battery", "Coimbatore", "Electric Vehicle Battery", "Perfect Batteries", "Chinna Mayil Industries"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`${inter.variable} ${orbitron.variable} font-sans bg-background text-foreground antialiased`}>
        {children}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
