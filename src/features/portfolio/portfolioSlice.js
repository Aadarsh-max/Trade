import { create } from 'zustand';
import { getHoldingsApi, getPortfolioSummaryApi, getRealizedPnlApi } from '../../api/portfolio.api';

export const usePortfolioStore = create((set) => ({
  holdings: [],
  summary: null,
  realizedPnl: null,
  loading: false,
  error: null,

  fetchHoldings: async () => {
    try {
      const response = await getHoldingsApi();
      set({ holdings: response.data });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch holdings' });
    }
  },

  fetchSummary: async () => {
    set({ loading: true });
    try {
      const response = await getPortfolioSummaryApi();
      set({ summary: response.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch summary', loading: false });
    }
  },

  fetchRealizedPnl: async () => {
    try {
      const response = await getRealizedPnlApi();
      set({ realizedPnl: response.data });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch realized P&L' });
    }
  },

  fetchAll: async () => {
    set({ loading: true });
    try {
      const [holdingsRes, summaryRes, pnlRes] = await Promise.all([
        getHoldingsApi(),
        getPortfolioSummaryApi(),
        getRealizedPnlApi(),
      ]);
      set({
        holdings: holdingsRes.data,
        summary: summaryRes.data,
        realizedPnl: pnlRes.data,
        loading: false,
      });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch portfolio data', loading: false });
    }
  },
}));