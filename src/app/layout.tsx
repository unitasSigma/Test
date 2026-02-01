import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Apex Gloss | High-End Luxury Car Detailing",
  description: "Exquisite detailing services for the world's finest automobiles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-h-screen">
        <header className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/10">
          <div className="text-2xl font-serif tracking-widest gold-text font-bold">APEX GLOSS</div>
          <nav className="space-x-8 text-sm uppercase tracking-widest text-silver/70">
            <a href="#services" className="hover:text-gold transition-colors">Services</a>
            <a href="#gallery" className="hover:text-gold transition-colors">Gallery</a>
            <a href="#booking" className="hover:text-gold transition-colors">Book Now</a>
          </nav>
        </header>
        {children}
        <footer className="py-12 px-8 border-t border-white/10 text-center text-sm text-silver/40">
          © {new Date().getFullYear()} APEX GLOSS LUXURY DETAILING. ALL RIGHTS RESERVED.
        </footer>
      </body>
    </html>
  );
}
