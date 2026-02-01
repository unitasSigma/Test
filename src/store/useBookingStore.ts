import { create } from 'zustand';

export type VehicleSize = 'COUPE' | 'SEDAN' | 'SUV';

interface BookingState {
  step: number;
  vehicleSize: VehicleSize;
  selectedServiceId: string | null;
  selectedDetailerId: string | null;
  startTime: string | null;
  totalPrice: number;
  isSubmitting: boolean;
  
  setStep: (step: number) => void;
  setVehicleSize: (size: VehicleSize) => void;
  setSelectedServiceId: (id: string | null) => void;
  setSelectedDetailerId: (id: string | null) => void;
  setStartTime: (time: string | null) => void;
  setTotalPrice: (price: number) => void;
  setIsSubmitting: (loading: boolean) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  step: 1,
  vehicleSize: 'SEDAN',
  selectedServiceId: null,
  selectedDetailerId: null,
  startTime: null,
  totalPrice: 0,
  isSubmitting: false,

  setStep: (step) => set({ step }),
  setVehicleSize: (vehicleSize) => set({ vehicleSize }),
  setSelectedServiceId: (selectedServiceId) => set({ selectedServiceId }),
  setSelectedDetailerId: (selectedDetailerId) => set({ selectedDetailerId }),
  setStartTime: (startTime) => set({ startTime }),
  setTotalPrice: (totalPrice) => set({ totalPrice }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  reset: () => set({ 
    step: 1, 
    vehicleSize: 'SEDAN', 
    selectedServiceId: null, 
    selectedDetailerId: null,
    startTime: null,
    totalPrice: 0,
    isSubmitting: false 
  }),
}));
