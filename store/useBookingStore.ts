import { create } from "zustand";

// Define the shape of the booking form state
export interface BookingState {
  serviceType: string;
  cleaningType: string;
  squareFootage: string;
  bedrooms: string;
  bathrooms: string;
  address: string;
  city: string;
  zipCode: string;
  state: string;
  county: string;
  date: Date | undefined;
  reoccurrence: string;
  lastCleaning: string;
  pets: string;
  specialRequests: string;
  selectedAddons: string[];
  discountCode: string;
  time: string;
  duration: string;
  totalPrice: number;
}

export interface PaymentDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface BookingStore {
  booking: BookingState;
  payment: PaymentDetails;

  updateBooking: <K extends keyof BookingState>(
    key: K,
    value: BookingState[K]
  ) => void;
  updatePayment: <K extends keyof PaymentDetails>(
    key: K,
    value: PaymentDetails[K]
  ) => void;
  setBooking: (data: Partial<BookingState>) => void;
  setPayment: (data: Partial<PaymentDetails>) => void;
  resetBooking: () => void;
  resetPayment: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  booking: {
    serviceType: "",
    cleaningType: "",
    squareFootage: "",
    bedrooms: "",
    bathrooms: "",
    address: "",
    city: "",
    zipCode: "",
    state: "",
    county: "",
    date: undefined,
    reoccurrence: "",
    lastCleaning: "",
    pets: "",
    specialRequests: "",
    selectedAddons: [],
    discountCode: "",
    time: "",
    duration: "Approx. 3hrs",
    totalPrice: 0,
  },
  payment: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },

  updateBooking: (key, value) =>
    set((state) => ({
      booking: { ...state.booking, [key]: value },
    })),

  updatePayment: (key, value) =>
    set((state) => ({
      payment: { ...state.payment, [key]: value },
    })),

  setBooking: (data) =>
    set((state) => ({
      booking: { ...state.booking, ...data },
    })),

  setPayment: (data) =>
    set((state) => ({
      payment: { ...state.payment, ...data },
    })),

  resetBooking: () =>
    set({
      booking: {
        serviceType: "",
        cleaningType: "",
        squareFootage: "",
        bedrooms: "",
        bathrooms: "",
        address: "",
        city: "",
        zipCode: "",
        state: "",
        county: "",
        date: undefined,
        reoccurrence: "",
        lastCleaning: "",
        pets: "",
        specialRequests: "",
        selectedAddons: [],
        discountCode: "",
        time: "",
        duration: "",
        totalPrice: 0,
      },
    }),

  resetPayment: () =>
    set({
      payment: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
    }),
}));
