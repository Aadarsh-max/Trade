import axiosInstance from './axiosInstance';

export const createStripeCheckoutApi = async (amount) => {
  const response = await axiosInstance.post('/payments/stripe/checkout', { amount });
  return response.data;
};

export const verifyStripePaymentApi = async (sessionId) => {
  const response = await axiosInstance.post('/payments/stripe/verify', { sessionId });
  return response.data;
};

export const createRazorpayOrderApi = async (amount) => {
  const response = await axiosInstance.post('/payments/razorpay/order', { amount });
  return response.data;
};

export const verifyRazorpayPaymentApi = async (data) => {
  const response = await axiosInstance.post('/payments/razorpay/verify', data);
  return response.data;
};