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
    <div className="rounded-card border border-bordersubtle bg-surface p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold tracking-tight text-textprimary">Watchlist</h2>
          <span className="rounded-full bg-glass px-2 py-0.5 text-[11px] font-medium text-textmuted">
            {watchlist.length}
          </span>
        </div>
        <button
          onClick={() => setShowInput(!showInput)}
          aria-label={showInput ? "Close" : "Add symbol"}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 active:scale-95 ${
            showInput
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-bordersubtle bg-glass text-textsecondary hover:border-borderstrong hover:text-textprimary"
          }`}
        >
          <Plus size={15} className={`transition-transform duration-200 ${showInput ? "rotate-45" : ""}`} />
        </button>
      </div>

      {showInput && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleAdd}
          className="mb-3 overflow-hidden"
        >
          <input
            autoFocus
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
            placeholder="e.g. ADAUSDT"
            className="h-9 w-full rounded-control border border-bordersubtle bg-surface px-3 text-sm text-textprimary outline-none transition-all duration-200 placeholder:text-textmuted focus:border-accent focus:ring-2 focus:ring-accent/20"
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
              className={`group relative flex cursor-pointer items-center justify-between rounded-control px-3 py-2.5 transition-all duration-200 ${
                isSelected ? "bg-accent/10" : "hover:bg-glass"
              }`}
            >
              {isSelected && (
                <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-accent" />
              )}
              <span className={`text-sm font-medium ${isSelected ? "text-accent" : "text-textprimary"}`}>
                {symbol.replace("USDT", "")}
              </span>
              <div className="flex items-center gap-2">
                {quote ? (
                  <span className="text-xs font-medium tabular-nums text-textsecondary">
                    {formatCurrency(quote.price, "USD")}
                  </span>
                ) : (
                  <div className="h-3 w-12 animate-pulse rounded bg-glass" />
                )}
                <SentimentBadge symbol={symbol} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWatchlist(symbol);
                  }}
                  aria-label={`Remove ${symbol.replace("USDT", "")}`}
                  className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-textmuted opacity-0 transition-all duration-200 hover:bg-danger/10 hover:text-danger group-hover:opacity-100 active:scale-95"
                >
                  <X size={13} />
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