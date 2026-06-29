import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#6258cf', '#15976c', '#d4860f', '#d83a39', '#3ba87f', '#c2477e'];

const AllocationChart = ({ holdings, cashBalance }) => {
  const data = [
    ...holdings.map((h) => ({ name: h.symbol.replace('USDT', ''), value: h.currentValue })),
    { name: 'Cash', value: cashBalance },
  ].filter((d) => d.value > 0);

  if (data.length === 0) {
    return <p className="py-10 text-center text-sm text-textmuted">No data to display</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={85} paddingAngle={3} cornerRadius={4}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{
              background: '#ffffff',
              border: '1px solid rgba(15,23,42,0.1)',
              borderRadius: '10px',
              fontSize: '12px',
              boxShadow: '0 4px 16px rgba(15,23,42,0.08)',
              padding: '8px 12px',
            }}
            itemStyle={{ color: '#1a1d24', fontWeight: 600 }}
            labelStyle={{ color: '#5c606b' }}
            formatter={(value) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-xs font-medium text-textsecondary">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllocationChart;