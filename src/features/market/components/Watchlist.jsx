import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, TrendingUp, TrendingDown } from "lucide-react";
import { useMarketStore } from "../marketSlice";
import SentimentBadge from "../../ai/components/SentimentBadge";
import { formatCurrency } from "../../../utils/formatters";

const Watchlist = () => {
  const {
    watchlist,
    quotes,
    selectedSymbol,
    selectSymbol,
    addToWatchlist,
    removeFromWatchlist,
  } = useMarketStore();
  const [newSymbol, setNewSymbol] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newSymbol.trim()) {
      addToWatchlist(newSymbol.trim());
      setNewSymbol("");
      setShowInput(false);
    }
  };

  return (
    <div className="bg-surface border border-bordersubtle rounded-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-textprimary text-base font-medium">Watchlist</h2>
        <button
          onClick={() => setShowInput(!showInput)}
          className="w-7 h-7 rounded-full bg-glass border border-bordersubtle flex items-center justify-center text-textsecondary hover:text-textprimary transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>

      {showInput && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleAdd}
          className="mb-3"
        >
          <input
            autoFocus
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
            placeholder="e.g. ADAUSDT"
            className="w-full h-9 px-3 rounded-control bg-glass border border-bordersubtle text-textprimary text-sm placeholder:text-textmuted outline-none focus:border-borderstrong"
          />
        </motion.form>
      )}

      <div className="flex flex-col gap-1">
        {watchlist.map((symbol) => {
          const quote = quotes[symbol];
          const isSelected = symbol === selectedSymbol;

          return (
            <div
              key={symbol}
              onClick={() => selectSymbol(symbol)}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-control cursor-pointer transition-colors ${
                isSelected ? "bg-accent/10" : "hover:bg-glass"
              }`}
            >
              <span className="text-textprimary text-sm">
                {symbol.replace("USDT", "")}
              </span>
              <div className="flex items-center gap-2">
                {quote ? (
                  <span className="text-textsecondary text-xs">
                    {formatCurrency(quote.price, "USD")}
                  </span>
                ) : (
                  <div className="h-3 w-12 bg-glass rounded animate-pulse" />
                )}
                <SentimentBadge symbol={symbol} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWatchlist(symbol);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-textmuted hover:text-danger transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Watchlist;
