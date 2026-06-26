import axiosInstance from './axiosInstance'

export const getBalanceApi = async () => {
  const response = await axiosInstance.get('/wallet/balance');
  return response.data;
};

export const depositApi = async (data) => {
  const response = await axiosInstance.post('/wallet/deposit', data);
  return response.data;
};

export const withdrawApi = async (data) => {
  const response = await axiosInstance.post('/wallet/withdraw', data);
  return response.data;
};

export const getTransactionHistoryApi = async (params) => {
  const response = await axiosInstance.get('/wallet/transactions', { params });
  return response.data;
};