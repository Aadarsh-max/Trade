import { create } from 'zustand';
import { placeOrderApi, cancelOrderApi, getOrdersApi } from '../../api/orders.api';

export const useOrdersStore = create((set, get) => ({
  orders: [],
  loading: false,
  placingOrder: false,
  error: null,
  lastFillNotice: null,

  fetchOrders: async (params = {}) => {
    set({ loading: true });
    try {
      const response = await getOrdersApi(params);
      set({ orders: response.data.orders, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch orders', loading: false });
    }
  },

  placeOrder: async (orderData) => {
    set({ placingOrder: true, error: null });
    try {
      const response = await placeOrderApi(orderData);
      await get().fetchOrders();
      return { success: true, data: response.data };
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to place order', placingOrder: false });
      return { success: false };
    } finally {
      set({ placingOrder: false });
    }
  },

  cancelOrder: async (orderId) => {
    try {
      await cancelOrderApi(orderId);
      await get().fetchOrders();
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to cancel order' });
      return false;
    }
  },

  setLastFillNotice: (notice) => set({ lastFillNotice: notice }),
  clearFillNotice: () => set({ lastFillNotice: null }),
}));