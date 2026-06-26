import { create } from 'zustand';

export const useWalletStore = create((set) => ({
  balance: 0,
  currency: 'INR',

  setWallet: (wallet) => {
    set({ balance: Number(wallet.balance), currency: wallet.currency });
  },
}));