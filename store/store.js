// store/store.js
import create from 'zustand';

const useStore = create((set) => ({
  pickup: '',
  destination: '',
  stop: '',
  date: '',
  time: '',
  vehicle: '',
  note: '',
  occasion: '',
  passengers: '',
  contact: { name: '', phone: '', email: '' },
  driverNote: '',
  distanceStartToEnd: 0,
  distanceStartToStop: 0,
  distanceStopToEnd: 0,
  setPickup: (pickup) => set({ pickup }),
  setDestination: (destination) => set({ destination }),
  setStop: (stop) => set({ stop }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setVehicle: (vehicle) => set({ vehicle }),
  setNote: (note) => set({ note }),
  setOccasion: (occasion) => set({ occasion }),
  setPassengers: (passengers) => set({ passengers }),
  setContact: (contact) => set({ contact }),
  setDriverNote: (driverNote) => set({ driverNote }),
  setDistances: (distances) => set(distances),
}));

export default useStore;
