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

  console.log(sparkline);

  const isPriceUp = sparkline[sparkline.length - 1] > sparkline[0];
  const lineColor = isPriceUp ? "var(--green)" : "var(--red)";

  const customTooltip = ({ payload }) => {
    if (payload && payload.length) {
      const { y } = payload[0].payload;
      return (
        <div className="coin-detail-sparkline__tooltip">
          <p>{`Price: $${y.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  const groupDataByDay = (data) => {
    const days = [];
    for (let i = 0; i < data.length; i += 24) {
      const dailyData = data.slice(i, i + 24);
      const averagePrice =
        dailyData.reduce((acc, point) => acc + point.y, 0) / dailyData.length;
      days.push({
        x: i / 24,
        y: averagePrice,
      });
    }
    return days;
  };

  const dailyData = groupDataByDay(chartData);

  return (
    <div className="coin-detail-sparkline__section">
      <div className="coin-detail-sparkline__title">
        <h4>{name} Price Chart (7d)</h4>
        <p>Chart only for USD price.</p>
      </div>
      <div className="coin-detail-sparkline__chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              ticks={[0, 1, 2, 3, 4, 5, 6]}
              tickFormatter={(tick) => `Day ${tick + 1}`}
              className="coin-detail-sparkline__xaxis"
              stroke="white"
            />
            <YAxis
              domain={["auto", "auto"]}
              className="coin-detail-sparkline__yaxis"
              stroke="white"
            />
            <Tooltip content={customTooltip} />
            <Line
              type="monotone"
              dataKey="y"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
              className="coin-detail-sparkline__line"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
