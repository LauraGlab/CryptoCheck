import "./../../css/coindetail/CoinDetailInfo.css";

export default function CoinDetailInfo({
  currency,
  currencySymbol,
  market_cap,
  fully_diluted_valuation,
  circulating_supply,
  total_supply,
  max_supply,
  ath,
  ath_change_percentage,
  ath_date,
  atl,
  atl_change_percentage,
  atl_date,
}) {
  const currencyKey = currency.toLowerCase() || "usd";

  const values = {
    marketCap: market_cap?.[currencyKey],
    fdv: fully_diluted_valuation?.[currencyKey],
    athV: ath?.[currencyKey],
    athPerc: ath_change_percentage?.[currencyKey],
    athDate: ath_date?.[currencyKey],
    atlV: atl?.[currencyKey],
    atlPerc: atl_change_percentage?.[currencyKey],
    atlDate: atl_date?.[currencyKey],
  };

  const formatNumber = (num) => (num ? num.toLocaleString() : "N/A");
  const renderPrice = (value) =>
    value ? `${currencySymbol}${formatNumber(value)}` : "N/A";
  const renderPercentage = (value) => (value ? `${value.toFixed(2)}%` : "N/A");
  const renderDate = (date) => (date ? date.slice(0, 10) : "N/A");

  return (
    <div className="coin-detail-info">
      <div className="coin-detail-info__line">
        <p className="coin-detail-info__title">Market Cap</p>
        <p className="coin-detail-info__value">
          {renderPrice(values.marketCap)}
        </p>
      </div>
      <div className="coin-detail-info__line">
        <p className="coin-detail-info__title">Fully Diluted Valuation</p>
        <p className="coin-detail-info__value">{renderPrice(values.fdv)}</p>
      </div>
      <div className="coin-detail-info__line">
        <p className="coin-detail-info__title">Circulating Supply</p>
        <p className="coin-detail-info__value">{circulating_supply || "N/A"}</p>
      </div>
      <div className="coin-detail-info__line">
        <p className="coin-detail-info__title">Total Supply</p>
        <p className="coin-detail-info__value">{total_supply || "N/A"}</p>
      </div>
      <div className="coin-detail-info__line">
        <p className="coin-detail-info__title">Max Supply</p>
        <p className="coin-detail-info__value">{max_supply || "N/A"}</p>
      </div>
      <div className="coin-detail-info__line">
        <p className="coin-detail-info__title">All-Time High</p>
        <div className="coin-detail-info__all-time">
          <div className="coin-detail-info__all-time-row">
            <p className="coin-detail-info__price">
              {renderPrice(values.athV)}
            </p>
            <p className="coin-detail-info__percentage coin-detail-info__percentage--red">
              {renderPercentage(values.athPerc)}
            </p>
          </div>
          <div className="coin-detail-info__date">
            {renderDate(values.athDate)}
          </div>
        </div>
      </div>
      <div className="coin-detail-info__line">
        <p className="coin-detail-info__title">All-Time Low</p>
        <div className="coin-detail-info__all-time">
          <div className="coin-detail-info__all-time-row">
            <p className="coin-detail-info__price">
              {renderPrice(values.atlV)}
            </p>
            <p className="coin-detail-info__percentage coin-detail-info__percentage--green">
              {renderPercentage(values.atlPerc)}
            </p>
          </div>
          <div className="coin-detail-info__date">
            {renderDate(values.atlDate)}
          </div>
        </div>
      </div>
    </div>
  );
}
