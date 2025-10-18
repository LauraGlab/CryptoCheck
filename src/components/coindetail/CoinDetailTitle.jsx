import "./../../css/coindetail/CoinDetailTitle.css";

export default function CoinDetailTitle({
  imageLarge,
  imageSmall,
  market_cap_rank,
  name,
  symbol_coin,
}) {
  return (
    <section className="coin-detail-title">
      <img
        className="coin-detail-title__image coin-detail-title__image--small"
        src={imageSmall}
        alt={`${name} image`}
      />
      <img
        className="coin-detail-title__image coin-detail-title__image--large"
        src={imageLarge}
        alt={`${name} image`}
      />
      <div className="coin-detail-title__info">
        <div className="coin-detail-title__name-section">
          <h2 className="coin-detail-title__name">{symbol_coin}</h2>
        </div>
        <small className="coin-detail-title__separator">•</small>
        <div className="coin-detail-title__details">
          <p className="coin-detail-title__symbol">{name}</p>
          <p className="coin-detail-title__rank">#{market_cap_rank}</p>
        </div>
      </div>
    </section>
  );
}
