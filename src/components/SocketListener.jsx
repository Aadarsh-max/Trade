import { useEffect } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import { useMarketStore } from "../features/market/marketSlice";
import { useOrdersStore } from "../features/orders/ordersSlice";
import { useWalletStore } from "../features/wallet/walletSlice";
import { useToastStore } from "../store/toastStore";
import { useNotificationsStore } from "../features/notifications/notificationsSlice";

const SocketListener = () => {
  const socket = useWebSocket();
  const updateQuote = useMarketStore((state) => state.updateQuote);
  const subscribeToWatchlist = useMarketStore(
    (state) => state.subscribeToWatchlist,
  );
  const handleOrderFilled = useOrdersStore((state) => state.handleOrderFilled);
  const fetchBalance = useWalletStore((state) => state.fetchBalance);
  const addToast = useToastStore((state) => state.addToast);
  const addLiveNotification = useNotificationsStore(
    (state) => state.addLiveNotification,
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      subscribeToWatchlist();
    });

    socket.on("price:update", (data) => {
      updateQuote(data.symbol, data);
    });

    socket.on("order:filled", (data) => {
      handleOrderFilled(data);
      fetchBalance();
      const title = "Order filled";
      const message = `${data.order.side} ${Number(data.order.quantity)} ${data.order.symbol.replace("USDT", "")} at $${Number(data.order.filledPrice).toLocaleString()}`;
      addToast({ type: "success", title, message });
      addLiveNotification({
        _id: `temp-${Date.now()}`,
        type: "ORDER_FILLED",
        title,
        message,
        read: false,
        createdAt: new Date().toISOString(),
      });
    });

    socket.on("order:rejected", (data) => {
      addToast({
        type: "error",
        title: "Order rejected",
        message: data.reason,
      });
    });

    return () => {
      socket.off("connect");
      socket.off("price:update");
      socket.off("order:filled");
      socket.off("order:rejected");
    };
  }, [socket]);

  return null;
};

export default SocketListener;
