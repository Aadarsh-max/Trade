import { create } from 'zustand';
import { createStripeCheckoutApi, createRazorpayOrderApi } from '../../api/payments.api';

export const usePaymentsStore = create((set) => ({
  loading: false,
  error: null,

  startStripeCheckout: async (amount) => {
    set({ loading: true, error: null });
    try {
      const response = await createStripeCheckoutApi(amount);
      const { sessionUrl } = response.data;

      if (!sessionUrl) {
        set({ loading: false, error: 'This deposit is already being processed' });
        return false;
      }

      window.location.href = sessionUrl;
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to start checkout', loading: false });
      return false;
    }
  },

  createRazorpayOrder: async (amount) => {
    set({ loading: true, error: null });
    try {
      const response = await createRazorpayOrderApi(amount);
      set({ loading: false });
      return response.data;
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to create order', loading: false });
      return null;
    }
  },

  clearError: () => set({ error: null }),
}));