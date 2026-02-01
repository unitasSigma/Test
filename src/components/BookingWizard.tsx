'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingStore } from '@/store/useBookingStore';
import RollingNumber from './RollingNumber';
import { ChevronRight, Calendar, User, Car, ShieldCheck } from 'lucide-react';
import { SERVICES, DETAILERS } from '@/lib/data';

const VEHICLE_SIZES = [
  { id: 'COUPE', label: 'Coupe', multiplier: 1 },
  { id: 'SEDAN', label: 'Sedan', multiplier: 1.2 },
  { id: 'SUV', label: 'SUV / Truck', multiplier: 1.5 },
];

export default function BookingWizard() {
  const { 
    step, setStep, 
    vehicleSize, setVehicleSize,
    selectedServiceId, setSelectedServiceId,
    selectedDetailerId, setSelectedDetailerId,
    startTime, setStartTime,
    totalPrice, setTotalPrice,
    isSubmitting, setIsSubmitting
  } = useBookingStore();

  const [localPrice, setLocalPrice] = useState(0);

  useEffect(() => {
    const service = SERVICES.find(s => s.id === selectedServiceId);
    const size = VEHICLE_SIZES.find(v => v.id === vehicleSize);
    if (service && size) {
      const calculated = service.basePrice * size.multiplier;
      setLocalPrice(calculated);
      setTotalPrice(calculated);
    }
  }, [selectedServiceId, vehicleSize, setTotalPrice]);

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        const res = await fetch('/api/bookings', {
          method: 'POST',
          body: JSON.stringify({
            userId: 'user_demo', // Demo user
            serviceId: selectedServiceId,
            detailerId: selectedDetailerId,
            startTime: startTime || new Date().toISOString(),
            vehicleSize,
            totalPrice
          }),
        });
        const booking = await res.json();
        
        const checkoutRes = await fetch('/api/checkout', {
          method: 'POST',
          body: JSON.stringify({
            appointmentId: booking.id,
            serviceName: SERVICES.find(s => s.id === selectedServiceId)?.name,
            price: totalPrice
          }),
        });
        const { url } = await checkoutRes.json();
        window.location.href = url;
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-luxury-black silver-border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-1 bg-gold/20 w-full">
        <motion.div 
          className="h-full bg-gold shadow-[0_0_10px_#d4af37]"
          initial={{ width: '0%' }}
          animate={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4 text-gold mb-4">
              <Car size={24} />
              <h3 className="text-xl uppercase tracking-widest font-bold">Select Vehicle Size</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VEHICLE_SIZES.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setVehicleSize(size.id as "COUPE" | "SEDAN" | "SUV")}
                  className={`p-6 rounded-xl border transition-all ${
                    vehicleSize === size.id 
                      ? 'bg-gold/10 border-gold text-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
                      : 'border-white/10 hover:border-white/30 text-silver/60'
                  }`}
                >
                  <span className="text-lg font-serif uppercase tracking-widest">{size.label}</span>
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
            <div className="flex items-center space-x-4 text-gold mb-4">
              <ShieldCheck size={24} />
              <h3 className="text-xl uppercase tracking-widest font-bold">Choose Treatment</h3>
            </div>
            <div className="space-y-4">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`w-full text-left p-6 rounded-xl border transition-all flex justify-between items-center ${
                    selectedServiceId === service.id 
                      ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div>
                    <h4 className={`text-xl font-serif ${selectedServiceId === service.id ? 'text-gold' : 'text-white'}`}>
                      {service.name}
                    </h4>
                    <p className="text-silver/50 text-sm mt-1">{service.description}</p>
                  </div>
                  <div className="text-xl font-mono text-gold">\${service.basePrice}</div>
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
            className="space-y-8"
          >
            <div className="flex items-center space-x-4 text-gold mb-4">
              <User size={24} />
              <h3 className="text-xl uppercase tracking-widest font-bold">Select Master Detailer</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DETAILERS.map((det) => (
                <button
                  key={det.id}
                  onClick={() => setSelectedDetailerId(det.id)}
                  className={`p-6 rounded-xl border transition-all ${
                    selectedDetailerId === det.id 
                      ? 'bg-gold/10 border-gold text-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
                      : 'border-white/10 hover:border-white/30 text-silver/60'
                  }`}
                >
                  <span className="text-lg font-serif">{det.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4 text-gold mb-4">
              <Calendar size={24} />
              <h3 className="text-xl uppercase tracking-widest font-bold">Preferred Time</h3>
            </div>
            <input 
              type="datetime-local" 
              className="w-full bg-white/5 border border-white/10 rounded-xl p-6 text-white outline-none focus:border-gold transition-colors"
              onChange={(e) => setStartTime(e.target.value)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <span className="text-silver/40 uppercase tracking-[0.3em] text-[10px] font-bold block mb-1">Estimated Investment</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-mono text-gold font-bold">$</span>
            <RollingNumber value={localPrice} />
          </div>
        </div>

        <div className="flex space-x-4">
          {step > 1 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="px-8 py-4 border border-white/10 text-silver/60 rounded-full hover:bg-white/5 transition-all"
            >
              Back
            </button>
          )}
          <button 
            onClick={handleNext}
            disabled={isSubmitting}
            className="px-12 py-4 bg-gold text-luxury-black font-bold uppercase tracking-widest text-xs rounded-full flex items-center space-x-3 hover:scale-105 transition-transform disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Securing...' : step === 4 ? 'Reserve Now' : 'Continue'}</span>
            {!isSubmitting && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
