import axiosInstance from './axiosInstance';

export const placeOrderApi = async (data) => {
  const response = await axiosInstance.post('/orders', data);
  return response.data;
};

export const cancelOrderApi = async (orderId) => {
  const response = await axiosInstance.patch(`/orders/${orderId}/cancel`);
  return response.data;
};

export const getOrdersApi = async (params) => {
  const response = await axiosInstance.get('/orders', { params });
  return response.data;
};

export const getOrderByIdApi = async (orderId) => {
  const response = await axiosInstance.get(`/orders/${orderId}`);
  return response.data;
};