import { create } from 'zustand';
import { getQuoteApi, getCandlesApi, getBatchQuotesApi } from '../../api/market.api';

const DEFAULT_WATCHLIST = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'XRPUSDT'];

export const useMarketStore = create((set, get) => ({
  watchlist: DEFAULT_WATCHLIST,
  quotes: {},
  candles: [],
  selectedSymbol: 'BTCUSDT',
  loading: false,
  candlesLoading: false,
  error: null,

  fetchWatchlistQuotes: async () => {
    set({ loading: true });
    try {
      const response = await getBatchQuotesApi(get().watchlist);
      const quoteMap = {};
      response.data.forEach((q) => {
        quoteMap[q.symbol] = q;
      });
      set({ quotes: quoteMap, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch quotes', loading: false });
    }
  },

  fetchCandles: async (symbol, interval = '1h') => {
    set({ candlesLoading: true });
    try {
      const response = await getCandlesApi(symbol, interval, 100);
      set({ candles: response.data, candlesLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch candles', candlesLoading: false });
    }
  },

  selectSymbol: (symbol) => {
    set({ selectedSymbol: symbol });
    get().fetchCandles(symbol);
  },

  updateQuote: (symbol, quote) => {
    set((state) => ({
      quotes: { ...state.quotes, [symbol]: quote },
    }));
  },

  addToWatchlist: (symbol) => {
    const upperSymbol = symbol.toUpperCase();
    if (!get().watchlist.includes(upperSymbol)) {
      set((state) => ({ watchlist: [...state.watchlist, upperSymbol] }));
      get().fetchWatchlistQuotes();
    }
  },

  removeFromWatchlist: (symbol) => {
    set((state) => ({
      watchlist: state.watchlist.filter((s) => s !== symbol),
    }));
  },
}));