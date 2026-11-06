import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const DEFAULT_BACKGROUND = 'beige';

// Visitor preferences and the contact details from their last order.
export const useUserStore = create(
  persist(
    (set) => ({
      background: DEFAULT_BACKGROUND,
      customer: { name: '', email: '', phone: '', address: '' },

      setBackground: (background) => set({ background }),
      saveCustomer: (customer) => set({ customer }),
    }),
    { name: 'moalab-user', storage: createJSONStorage(() => localStorage) },
  ),
);
