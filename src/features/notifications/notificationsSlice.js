import { create } from 'zustand';
import { getNotificationsApi, markAsReadApi, markAllAsReadApi } from '../../api/notifications.api';

export const useNotificationsStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  fetchNotifications: async () => {
    set({ loading: true });
    try {
      const response = await getNotificationsApi({ page: 1, limit: 20 });
      set({
        notifications: response.data.notifications,
        unreadCount: response.data.unreadCount,
        loading: false,
      });
    } catch (err) {
      set({ loading: false });
    }
  },

  markAsRead: async (notificationId) => {
    try {
      await markAsReadApi(notificationId);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n._id === notificationId ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch (err) {
    }
  },

  markAllAsRead: async () => {
    try {
      await markAllAsReadApi();
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      }));
    } catch (err) {
    }
  },

  addLiveNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },
}));