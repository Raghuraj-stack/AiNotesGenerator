import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#a855f7"];

// Accepts several shapes so it works whatever your AI returns:
//   data: [{ name, value }]  |  [{ label, value }]  |  [{ x, y }]
//   data: { labels: [...], values: [...] }
function normalize(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map((d, i) => ({
      name: String(d.name ?? d.label ?? d.x ?? `Item ${i + 1}`),
      value: Number(d.value ?? d.y ?? 0),
    }));
  }
  if (Array.isArray(raw.labels) && Array.isArray(raw.values)) {
    return raw.labels.map((l, i) => ({ name: String(l), value: Number(raw.values[i] ?? 0) }));
  }
  return [];
}

function RechartSetUp({ chart }) {
  const data = normalize(chart?.data);
  if (!data.length) return null;
  const type = (chart.type || "pie").toLowerCase();

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      {chart.title && <h4 className="mb-2 font-semibold text-gray-800">📊 {chart.title}</h4>}

      {/* fixed height wrapper = no "width(-1) height(-1)" warning */}
      <div style={{ width: "100%", height: 320, minWidth: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          ) : type === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          ) : (
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" outerRadius={110} label>
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RechartSetUp;