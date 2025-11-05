import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import "./../../css/coindetail/CoinDetailSparkline.css";

export default function CoinDetailSparkline({ name, sparkline }) {
  const chartData = sparkline.map((price, index) => ({
    x: index,
    y: price,
  }));

  const isPriceUp = sparkline[sparkline.length - 1] > sparkline[0];
  const lineColor = isPriceUp ? "var(--green)" : "var(--red)";

  const customTooltip = ({ payload }) => {
    if (payload && payload.length) {
      const { y } = payload[0].payload;
      return (
        <div className="glass coin-detail-sparkline__tooltip">
          <p>${y.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  const groupDataByDay = (data) => {
    const days = [];
    for (let i = 0; i < data.length; i += 24) {
      const dailyData = data.slice(i, i + 24);
      const avg =
        dailyData.reduce((acc, point) => acc + point.y, 0) / dailyData.length;
      days.push({ x: i / 24, y: avg });
    }
    return days;
  };

  const dailyData = groupDataByDay(chartData);

  return (
    <section className="glass coin-detail-sparkline__section">
      <header className="coin-detail-sparkline__header">
        <div className="coin-detail-sparkline__title">
          <h4>{name}: 7d Price Chart</h4>
          <p>Based on average daily USD prices</p>
        </div>
        <span
          className={`coin-detail-sparkline__trend ${
            isPriceUp ? "up" : "down"
          }`}
        >
          {isPriceUp ? "↑ Uptrend" : "↓ Downtrend"}
        </span>
      </header>

      <div className="coin-detail-sparkline__chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="x"
              ticks={[0, 1, 2, 3, 4, 5, 6]}
              tickFormatter={(tick) => `Day ${tick + 1}`}
              stroke="var(--text-main)"
            />
            <YAxis
              domain={["auto", "auto"]}
              stroke="var(--text-main)"
              tickFormatter={(v) => `$${v.toFixed(0)}`}
            />
            <Tooltip content={customTooltip} />
            <Line
              type="monotone"
              dataKey="y"
              stroke={lineColor}
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
