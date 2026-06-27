import axiosInstance from './axiosInstance';

export const getHoldingsApi = async () => {
  const response = await axiosInstance.get('/portfolio/holdings');
  return response.data;
};

export const getPortfolioSummaryApi = async () => {
  const response = await axiosInstance.get('/portfolio/summary');
  return response.data;
};

export const getRealizedPnlApi = async () => {
  const response = await axiosInstance.get('/portfolio/pnl');
  return response.data;
};