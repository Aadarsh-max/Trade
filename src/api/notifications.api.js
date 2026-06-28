import axiosInstance from './axiosInstance';

export const getNotificationsApi = async (params) => {
  const response = await axiosInstance.get('/notifications', { params });
  return response.data;
};

export const markAsReadApi = async (notificationId) => {
  const response = await axiosInstance.patch(`/notifications/${notificationId}/read`);
  return response.data;
};

export const markAllAsReadApi = async () => {
  const response = await axiosInstance.patch('/notifications/read-all');
  return response.data;
};