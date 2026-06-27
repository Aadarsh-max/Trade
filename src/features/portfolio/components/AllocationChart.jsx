import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#7f77dd', '#1d9e75', '#ef9f27', '#e24b4a', '#5dcaa5', '#d4537e'];

const AllocationChart = ({ holdings, cashBalance }) => {
  const data = [
    ...holdings.map((h) => ({ name: h.symbol.replace('USDT', ''), value: h.currentValue })),
    { name: 'Cash', value: cashBalance },
  ].filter((d) => d.value > 0);

  if (data.length === 0) {
    return <p className="text-textmuted text-sm text-center py-8">No data to display</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#0a0e14',
              border: '0.5px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            itemStyle={{ color: '#fff' }}
            formatter={(value) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-textsecondary text-xs">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllocationChart;