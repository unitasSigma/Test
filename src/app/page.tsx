'use client';

import { motion } from 'framer-motion';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import BookingWizard from '@/components/BookingWizard';
import MacroGallery from '@/components/MacroGallery';
import MagneticButton from '@/components/MagneticButton';
import { Shield, Zap, Star } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <main className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-8 mb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-tight">
            The Perfection of <br />
            <span className="gold-text italic">Reflected Light</span>
          </h1>
          <p className="max-w-2xl mx-auto text-silver/60 text-lg mb-12 tracking-wide">
            Specializing in high-end paint correction and nanoceramic protection for the world&apos;s most prestigious automobiles.
          </p>
          <div className="flex justify-center">
            <MagneticButton>
              <button className="px-12 py-5 bg-gold text-luxury-black font-bold uppercase tracking-[0.3em] text-xs rounded-full hover:bg-gold-light transition-all shadow-[0_20px_40px_rgba(212,175,55,0.2)]">
                Book an Appointment
              </button>
            </MagneticButton>
          </div>
        </motion.div>
      </section>

      {/* Macro Gallery Section */}
      <section id="gallery" className="px-8 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif mb-4 italic">Macro Precision</h2>
            <p className="text-silver/50 max-w-xl mx-auto uppercase tracking-widest text-[10px] font-bold">Details that others miss, we celebrate.</p>
          </div>
          <MacroGallery />
        </div>
      </section>

      {/* Before/After Section */}
      <section className="px-8 mb-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl font-serif mb-4">Visible Transformation</h2>
              <p className="text-silver/50">Slide to witness the restoration of a 1967 GT500 from swirl-marked paint to a flawless ceramic-coated finish.</p>
            </div>
            <div className="text-sm uppercase tracking-widest text-gold border-b border-gold/30 pb-2">Master Correction Phase</div>
          </div>
          <BeforeAfterSlider 
            beforeImage="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000"
            afterImage="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2000"
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-8 mb-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif mb-16 text-center italic">Curated Treatments</h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Shield, title: 'Paint Protection', desc: 'Self-healing PPF and multi-layer ceramic coatings.' },
              { icon: Zap, title: 'Paint Correction', desc: 'Multi-stage machine polishing to absolute clarity.' },
              { icon: Star, title: 'Bespoke Detailing', desc: 'Concours-level interior and exterior restoration.' }
            ].map((service, i) => (
              <motion.div key={i} variants={itemVariants} className="p-10 rounded-2xl bg-white/5 silver-border hover:bg-white/10 transition-all group">
                <service.icon className="text-gold mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-2xl font-serif mb-4">{service.title}</h3>
                <p className="text-silver/40 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking Wizard Section */}
      <section id="booking" className="px-8 mb-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif mb-4">Secure Your Session</h2>
            <p className="text-silver/50">Configure your bespoke detailing package and check real-time availability.</p>
          </div>
          <BookingWizard />
        </div>
      </section>
    </main>
  );
}
