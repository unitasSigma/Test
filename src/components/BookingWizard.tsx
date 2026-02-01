'use client';

import React from 'react';
import { useBookingStore, VehicleSize } from '@/store/useBookingStore';
import RollingNumber from './RollingNumber';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Car } from 'lucide-react';

const SERVICES = [
  { id: '1', name: 'Signature Polish', basePrice: 250, description: 'Deep paint correction and high-gloss finish.' },
  { id: '2', name: 'Ceramic Pro', basePrice: 850, description: 'Permanent nanoceramic coating with lifetime warranty.' },
  { id: '3', name: 'Interior Revival', basePrice: 150, description: 'Steam cleaning and leather conditioning.' },
];

const VEHICLE_TYPES: { type: VehicleSize; label: string; icon: React.ElementType }[] = [
  { type: 'COUPE', label: 'Coupe', icon: Car },
  { type: 'SEDAN', label: 'Sedan', icon: Car },
  { type: 'SUV', label: 'SUV / Truck', icon: Car },
];

export default function BookingWizard() {
  const { step, setStep, vehicleSize, setVehicleSize, selectedService, setSelectedService, totalPrice } = useBookingStore();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="w-full max-w-4xl mx-auto p-8 rounded-2xl bg-luxury-charcoal silver-border overflow-hidden">
      {/* Progress Bar */}
      <div className="flex justify-between mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${step >= s ? 'bg-gold border-gold text-luxury-black' : 'border-white/20 text-white/40'}`}>
              {step > s ? <Check size={20} /> : s}
            </div>
            <span className="text-[10px] uppercase tracking-widest mt-2 text-white/40">Step 0{s}</span>
          </div>
        ))}
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-serif">Select Vehicle Class</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {VEHICLE_TYPES.map((v) => (
                  <button
                    key={v.type}
                    onClick={() => setVehicleSize(v.type)}
                    className={`p-6 rounded-xl border transition-all flex flex-col items-center space-y-4 ${vehicleSize === v.type ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-white/30'}`}
                  >
                    <v.icon size={48} className={vehicleSize === v.type ? 'text-gold' : 'text-white/20'} />
                    <span className="uppercase tracking-widest text-sm">{v.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-serif">Choose Your Service</h2>
              <div className="space-y-4">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedService(s)}
                    className={`w-full p-6 rounded-xl border transition-all flex justify-between items-center ${selectedService?.id === s.id ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-white/30'}`}
                  >
                    <div className="text-left">
                      <div className="text-xl font-medium">{s.name}</div>
                      <div className="text-sm text-white/40">{s.description}</div>
                    </div>
                    <div className="text-2xl font-serif text-gold">${s.basePrice}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 text-center"
            >
              <h2 className="text-3xl font-serif">Review & Reserve</h2>
              <div className="py-8 space-y-2">
                <div className="text-sm uppercase tracking-[0.3em] text-white/40">Total Investment</div>
                <div className="text-7xl font-serif gold-text">$<RollingNumber value={totalPrice} /></div>
              </div>
              <div className="bg-white/5 p-6 rounded-xl text-left space-y-4 border border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Vehicle</span>
                  <span className="uppercase tracking-widest">{vehicleSize}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Service</span>
                  <span className="uppercase tracking-widest">{selectedService?.name}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 flex justify-between items-center">
        {step > 1 ? (
          <button onClick={handleBack} className="text-sm uppercase tracking-widest text-white/40 hover:text-white transition-colors">Back</button>
        ) : <div />}
        
        {step < 3 ? (
          <button 
            onClick={handleNext}
            disabled={step === 2 && !selectedService}
            className="flex items-center space-x-2 px-8 py-4 bg-gold text-luxury-black uppercase tracking-[0.2em] font-bold text-xs rounded-full hover:bg-gold-light transition-all disabled:opacity-50"
          >
            <span>Continue</span>
            <ChevronRight size={16} />
          </button>
        ) : (
          <button className="flex items-center space-x-2 px-12 py-4 luxury-gradient text-luxury-black uppercase tracking-[0.2em] font-bold text-xs rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-all">
            <span>Confirm & Pay</span>
          </button>
        )}
      </div>
    </div>
  );
}
