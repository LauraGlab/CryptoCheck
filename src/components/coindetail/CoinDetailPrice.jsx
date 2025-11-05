import "./../../css/coindetail/CoinDetailPrice.css";

export default function CoinDetailPrice({
  currency,
  currencySymbol,
  current_price,
  price_change_percentage_24h_in_currency,
}) {
  const getValue = (key) => {
    return {
      price: current_price[key],
      priceChange: price_change_percentage_24h_in_currency[key],
    };
  };

  const { price, priceChange } = getValue(currency.toLowerCase());

  const formattedPrice = price
    ? `${currencySymbol}${price.toLocaleString()}`
    : "No data";

  const isNegative = priceChange < 0;
  const isZero = priceChange === 0;
  const colorClass = isZero
    ? ""
    : isNegative
    ? "red"
    : "green";

  const renderPriceChange = (value) => {
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

  return (
    <div className="coin-detail-price">
      <div className="coin-detail-price__price-section">
        <div className="coin-detail-price__price-wrapper">
          <h3 className={`coin-detail-price__price ${colorClass}`}>
            {formattedPrice}
          </h3>
          {renderPriceChange(priceChange)}
        </div>
      </div>
    </div>
  );
}
