import { create } from 'zustand';
import { chatApi, getChatHistoryApi, getInsightsApi } from '../../api/ai.api';

export const useAiStore = create((set, get) => ({
  messages: [],
  insights: null,
  loading: false,
  insightsLoading: false,
  error: null,

  fetchChatHistory: async () => {
    try {
      const response = await getChatHistoryApi(20);
      const formatted = response.data.map((m) => ({ role: m.role, content: m.content }));
      set({ messages: formatted });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to load chat history' });
    }
  },

  sendMessage: async (message) => {
    set((state) => ({
      messages: [...state.messages, { role: 'user', content: message }],
      loading: true,
      error: null,
    }));

    try {
      const response = await chatApi(message);
      set((state) => ({
        messages: [...state.messages, { role: 'assistant', content: response.data.reply }],
        loading: false,
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to get response', loading: false });
    }
  },

  fetchInsights: async () => {
    set({ insightsLoading: true });
    try {
      const response = await getInsightsApi();
      set({ insights: response.data.insights, insightsLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch insights', insightsLoading: false });
    }
  },
}));