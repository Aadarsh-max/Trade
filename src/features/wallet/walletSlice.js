import { create } from 'zustand';
import { getBalanceApi, depositApi, withdrawApi, getTransactionHistoryApi } from '../../api/wallet.api';
import { generateIdempotencyKey } from '../../utils/idempotency';

export const useWalletStore = create((set, get) => ({
  balance: 0,
  currency: 'INR',
  transactions: [],
  loading: false,
  actionLoading: false,
  error: null,

  fetchBalance: async () => {
    set({ loading: true });
    try {
      const response = await getBalanceApi();
      set({
        balance: Number(response.data.balance),
        currency: response.data.currency,
        loading: false,
      });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch balance', loading: false });
    }
  },

  fetchTransactions: async () => {
    try {
      const response = await getTransactionHistoryApi({ page: 1, limit: 20 });
      set({ transactions: response.data.transactions });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch transactions' });
    }
  },

  deposit: async (amount) => {
    set({ actionLoading: true, error: null });
    try {
      const idempotencyKey = generateIdempotencyKey();
      const response = await depositApi({ amount, idempotencyKey });
      set({
        balance: Number(response.data.wallet.balance),
        actionLoading: false,
      });
      await get().fetchTransactions();
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || 'Deposit failed', actionLoading: false });
      return false;
    }
  },

  withdraw: async (amount) => {
    set({ actionLoading: true, error: null });
    try {
      const idempotencyKey = generateIdempotencyKey();
      const response = await withdrawApi({ amount, idempotencyKey });
      set({
        balance: Number(response.data.wallet.balance),
        actionLoading: false,
      });
      await get().fetchTransactions();
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || 'Withdrawal failed', actionLoading: false });
      return false;
    }
  },
}));