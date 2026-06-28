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
      <table className="w-full text-sm">
        <thead>
          <tr className="text-textmuted text-xs border-b border-bordersubtle">
            <th className="text-left py-2 px-2 font-normal">Asset</th>
            <th className="text-right py-2 px-2 font-normal">Quantity</th>
            <th className="text-right py-2 px-2 font-normal">Avg buy price</th>
            <th className="text-right py-2 px-2 font-normal">Current price</th>
            <th className="text-right py-2 px-2 font-normal">Value</th>
            <th className="text-right py-2 px-2 font-normal">P&L</th>
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
                className="border-b border-bordersubtle last:border-0"
              >
                <td className="py-3 px-2 text-textprimary font-medium">
                  {holding.symbol.replace("USDT", "")}
                </td>
                <td className="py-3 px-2 text-right text-textsecondary">
                  {holding.quantity}
                </td>
                <td className="py-3 px-2 text-right text-textsecondary">
                  {formatCurrency(holding.avgBuyPrice, "USD")}
                </td>
                <td className="py-3 px-2 text-right text-textsecondary">
                  {formatCurrency(holding.currentPrice, "USD")}
                </td>
                <td className="py-3 px-2 text-right text-textprimary">
                  {formatCurrency(holding.currentValue, "USD")}
                </td>
                <td
                  className={`py-3 px-2 text-right font-medium ${isPositive ? "text-success" : "text-danger"}`}
                >
                  {isPositive ? "+" : ""}
                  {formatCurrency(holding.unrealizedPnl, "USD")}
                  <span className="text-xs ml-1 opacity-70">
                    ({isPositive ? "+" : ""}
                    {holding.unrealizedPnlPercent.toFixed(1)}%)
                  </span>
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
