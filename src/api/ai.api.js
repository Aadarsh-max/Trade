import axiosInstance from './axiosInstance';

export const chatApi = async (message) => {
  const response = await axiosInstance.post('/ai/chat', { message });
  return response.data;
};

export const getChatHistoryApi = async (limit = 20) => {
  const response = await axiosInstance.get('/ai/chat/history', { params: { limit } });
  return response.data;
};

export const getSentimentApi = async (headlines) => {
  const response = await axiosInstance.post('/ai/sentiment', { headlines });
  return response.data;
};

export const getInsightsApi = async () => {
  const response = await axiosInstance.get('/ai/insights');
  return response.data;
};