import "./../../css/coindetail/CoinDetailPrice.css";

export default function CoinDetailPrice({
  currency,
  currencySymbol,
  current_price,
  high_24h,
  low_24h,
  price_change_percentage_24h_in_currency,
}) {
  const renderPrice = (value) => {
    if (value === undefined || value === null) return <p>No data</p>;

    const rounded = value.toFixed(2);
    const isZero = parseFloat(rounded) === 0;

    const formattedValue = isZero ? "0.00" : rounded;
    const isNegative = parseFloat(formattedValue) < 0;
    const className = isNegative
      ? "coin-detail-price__price--red"
      : "coin-detail-price__price--green";

    return (
      <p className={className}>
        {isZero
          ? formattedValue
          : isNegative
          ? formattedValue
          : `+${formattedValue}`}
        %
      </p>
    );
  };

  const getValue = (key) => {
    return {
      price: current_price[key],
      priceChange: price_change_percentage_24h_in_currency[key],
      dayHigh: high_24h[key],
      dayLow: low_24h[key],
    };
  };

  const { price, priceChange, dayHigh, dayLow } = getValue(
    currency.toLowerCase()
  );

  const formattedPrice = price
    ? `${currencySymbol}${price.toLocaleString()}`
    : "No data";
  const highFormatted = dayHigh
    ? `${currencySymbol}${dayHigh.toLocaleString()}`
    : "No data";
  const lowFormatted = dayLow
    ? `${currencySymbol}${dayLow.toLocaleString()}`
    : "No data";

  return (
    <div className="coin-detail-price">
      <div className="coin-detail-price__price-section">
        <div className="coin-detail-price__price-wrapper">
          <h3 className="coin-detail-price__price glass">{formattedPrice}</h3>
          {renderPrice(priceChange)}
        </div>
        <div className="coin-detail-price__change-section">
          <div className="coin-detail-price__change coin-detail-price__change--high">
            <h3 className="coin-detail-price__change-title">24hr High:</h3>
            <h3 className="coin-detail-price__change-value coin-detail-price__change-value--green">
              {highFormatted}
            </h3>
          </div>
          <div className="coin-detail-price__change coin-detail-price__change--low">
            <h3 className="coin-detail-price__change-title">24hr Low:</h3>
            <h3 className="coin-detail-price__change-value coin-detail-price__change-value--red">
              {lowFormatted}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
