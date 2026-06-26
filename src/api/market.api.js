import axiosInstance from './axiosInstance';

export const getQuoteApi = async (symbol) => {
  const response = await axiosInstance.get(`/market/quote/${symbol}`);
  return response.data;
};

export const getCandlesApi = async (symbol, interval = '1h', limit = 100) => {
  const response = await axiosInstance.get(`/market/candles/${symbol}`, {
    params: { interval, limit },
  });
  return response.data;
};

export const getBatchQuotesApi = async (symbols) => {
  const response = await axiosInstance.post('/market/quotes/batch', { symbols });
  return response.data;
};