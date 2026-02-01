import { create } from 'zustand';

export type VehicleSize = 'COUPE' | 'SEDAN' | 'SUV';

interface Service {
  id: string;
  name: string;
  basePrice: number;
}

interface BookingState {
  step: number;
  vehicleSize: VehicleSize;
  selectedService: Service | null;
  totalPrice: number;
  setStep: (step: number) => void;
  setVehicleSize: (size: VehicleSize) => void;
  setSelectedService: (service: Service | null) => void;
  calculateTotalPrice: () => void;
  reset: () => void;
}

const VEHICLE_MULTIPLIERS: Record<VehicleSize, number> = {
  COUPE: 1.0,
  SEDAN: 1.2,
  SUV: 1.5,
};

export const useBookingStore = create<BookingState>((set, get) => ({
  step: 1,
  vehicleSize: 'SEDAN',
  selectedService: null,
  totalPrice: 0,
  setStep: (step) => set({ step }),
  setVehicleSize: (vehicleSize) => {
    set({ vehicleSize });
    get().calculateTotalPrice();
  },
  setSelectedService: (selectedService) => {
    set({ selectedService });
    get().calculateTotalPrice();
  },
  calculateTotalPrice: () => {
    const { selectedService, vehicleSize } = get();
    if (!selectedService) {
      set({ totalPrice: 0 });
      return;
    }
    const multiplier = VEHICLE_MULTIPLIERS[vehicleSize];
    set({ totalPrice: selectedService.basePrice * multiplier });
  },
  reset: () => set({ step: 1, vehicleSize: 'SEDAN', selectedService: null, totalPrice: 0 }),
}));
