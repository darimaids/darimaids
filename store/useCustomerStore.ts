// store/useCustomerStore.ts
import { create } from "zustand";

interface CustomerState {
  token: string | null;
  user: any | null;
  setCustomerData: (token: string, user: any) => void;
  clearCustomer: () => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  token: null,
  user: null,
  setCustomerData: (token, user) => set({ token, user }),
  clearCustomer: () => set({ token: null, user: null }),
}));
