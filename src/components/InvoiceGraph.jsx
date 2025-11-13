import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const InvoiceGraph = ({ invoices }) => {
  // Group invoices by month or another criteria for graphing
  const data = invoices?.reduce((acc, inv) => {
    const month = new Date(inv.date).toLocaleString("default", { month: "short" });
    const index = acc.findIndex((d) => d.month === month);
    const amount = inv.items.reduce((sum, t) => sum + t.quantity * t.rate, 0);
    if (index === -1) {
      acc.push({ month, total: amount });
    } else {
      acc[index].total += amount;
    }
    return acc;
  }, []);

  return (
    <ResponsiveContainer width="100%">
      <BarChart data={data.reverse()}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default InvoiceGraph;
