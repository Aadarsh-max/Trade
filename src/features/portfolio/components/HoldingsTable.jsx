import { motion } from "framer-motion";
import { formatCurrency } from "../../../utils/formatters";
import { Briefcase } from "lucide-react";
import EmptyState from "../../../components/common/EmptyState";

const HoldingsTable = ({ holdings }) => {
  if (holdings.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title="No holdings yet"
        description="Start trading to build your portfolio"
      />
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr className="text-xs text-textmuted">
            <th className="border-b border-bordersubtle px-3 py-2.5 text-left font-medium">Asset</th>
            <th className="border-b border-bordersubtle px-3 py-2.5 text-right font-medium">Quantity</th>
            <th className="border-b border-bordersubtle px-3 py-2.5 text-right font-medium">Avg buy price</th>
            <th className="border-b border-bordersubtle px-3 py-2.5 text-right font-medium">Current price</th>
            <th className="border-b border-bordersubtle px-3 py-2.5 text-right font-medium">Value</th>
            <th className="border-b border-bordersubtle px-3 py-2.5 text-right font-medium">P&L</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding, index) => {
            const isPositive = holding.unrealizedPnl >= 0;

            return (
              <motion.tr
                key={holding.symbol}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                className="group transition-colors hover:bg-glass/60"
              >
                <td className="border-b border-bordersubtle px-3 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/12 text-[11px] font-bold text-accent">
                      {holding.symbol.replace("USDT", "").slice(0, 3)}
                    </span>
                    <span className="font-semibold text-textprimary">{holding.symbol.replace("USDT", "")}</span>
                  </div>
                </td>
                <td className="border-b border-bordersubtle px-3 py-3.5 text-right tabular-nums text-textsecondary">
                  {holding.quantity}
                </td>
                <td className="border-b border-bordersubtle px-3 py-3.5 text-right tabular-nums text-textsecondary">
                  {formatCurrency(holding.avgBuyPrice, "USD")}
                </td>
                <td className="border-b border-bordersubtle px-3 py-3.5 text-right tabular-nums text-textsecondary">
                  {formatCurrency(holding.currentPrice, "USD")}
                </td>
                <td className="border-b border-bordersubtle px-3 py-3.5 text-right font-semibold tabular-nums text-textprimary">
                  {formatCurrency(holding.currentValue, "USD")}
                </td>
                <td className="border-b border-bordersubtle px-3 py-3.5 text-right">
                  <div className="flex flex-col items-end">
                    <span className={`font-semibold tabular-nums ${isPositive ? "text-success" : "text-danger"}`}>
                      {isPositive ? "+" : ""}
                      {formatCurrency(holding.unrealizedPnl, "USD")}
                    </span>
                    <span className={`mt-0.5 rounded px-1 text-[10px] font-semibold tabular-nums ${isPositive ? "bg-success/12 text-success" : "bg-danger/12 text-danger"}`}>
                      {isPositive ? "+" : ""}
                      {holding.unrealizedPnlPercent.toFixed(1)}%
                    </span>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HoldingsTable;