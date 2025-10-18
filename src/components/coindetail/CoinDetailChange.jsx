import "./../../css/coindetail/CoinDetailChange.css";

export default function CoinDetailChange({
  currency,
  hour,
  day,
  week,
  halfMonth,
  month,
}) {
  const currencyKey = currency?.toLowerCase() || "usd";

  const renderPriceChange = (value) => {
    if (value === undefined || value === null)
      return (
        <p
          className="coin-detail-change__no-data"
          aria-label="No data available"
        >
          No data
        </p>
      );

    const rounded = value.toFixed(2);
    const isZero = parseFloat(rounded) === 0;
    const formattedValue = isZero ? "0.00" : rounded;
    const isNegative = parseFloat(formattedValue) < 0;

    const className = isNegative
      ? "coin-detail-change__percentage--red"
      : "coin-detail-change__percentage--green";

    const ariaText = isZero
      ? "No change"
      : isNegative
      ? `Decreased by ${Math.abs(formattedValue)} percent`
      : `Increased by ${formattedValue} percent`;

    return (
      <p
        className={`coin-detail-change__percentage ${className}`}
        aria-label={ariaText}
      >
        {isZero
          ? formattedValue
          : isNegative
          ? formattedValue
          : `+${formattedValue}`}
        %
      </p>
    );
  };

  const hourV = renderPriceChange(hour?.[currencyKey]);
  const dayV = renderPriceChange(day?.[currencyKey]);
  const weekV = renderPriceChange(week?.[currencyKey]);
  const halfMonthV = renderPriceChange(halfMonth?.[currencyKey]);
  const monthV = renderPriceChange(month?.[currencyKey]);

  return (
    <table
      className="coin-detail-change__table"
      role="table"
      aria-label={`Price change summary for ${currencyKey.toUpperCase()}`}
    >
      <thead>
        <tr className="coin-detail-change__header-row" role="row">
          <th
            className="coin-detail-change__header-cell"
            scope="col"
            aria-label="Change over 1 hour"
          >
            1h
          </th>
          <th
            className="coin-detail-change__header-cell"
            scope="col"
            aria-label="Change over 24 hours"
          >
            24h
          </th>
          <th
            className="coin-detail-change__header-cell"
            scope="col"
            aria-label="Change over 7 days"
          >
            7d
          </th>
          <th
            className="coin-detail-change__header-cell"
            scope="col"
            aria-label="Change over 14 days"
          >
            14d
          </th>
          <th
            className="coin-detail-change__header-cell"
            scope="col"
            aria-label="Change over 30 days"
          >
            30d
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className="coin-detail-change__body-row" role="row">
          <td className="coin-detail-change__body-cell" role="cell">
            {hourV}
          </td>
          <td className="coin-detail-change__body-cell" role="cell">
            {dayV}
          </td>
          <td className="coin-detail-change__body-cell" role="cell">
            {weekV}
          </td>
          <td className="coin-detail-change__body-cell" role="cell">
            {halfMonthV}
          </td>
          <td className="coin-detail-change__body-cell" role="cell">
            {monthV}
          </td>
        </tr>
      </tbody>
    </table>
  );
}