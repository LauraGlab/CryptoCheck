import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./../../css/common/CoinCard.css";

export default function CoinCard({
  coinId,
  coinName,
  coinSymbol,
  icon,
  marketCapRank,
  toggleFavorite,
  price,
  priceChange,
  isFavorite,
  onClick,
  fav = false,
  rank = false,
}) {
  const coinPath = coinId.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link to={`/${coinPath}`} className="coin-card__link">
      <div className="coin-card glass" onClick={onClick}>
        <div className="coin-card__header">
          <img src={icon} alt={coinName} className="coin-card__icon" />

          <div className="coin-card__text-group">
            <h3 className="coin-card__symbol">{coinSymbol}</h3>
            <p className="coin-card__name">{coinName}</p>
          </div>

          {rank && <div className="coin-card__rank">#{marketCapRank}</div>}
        </div>
        <p
          className={`coin-card__change ${
            priceChange > 0 ? "up" : priceChange < 0 ? "down" : "neutral"
          }`}
        >
          {priceChange > 0 && "▲ "}
          {priceChange < 0 && "▼ "}
          {priceChange?.toFixed(2)}%
        </p>

        <h3 className="coin-card__price">
          ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h3>
        {fav && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (toggleFavorite) toggleFavorite(coinId);
            }}
            aria-label="Toggle favorite"
            className={`coin-card__fav-button ${isFavorite ? "favorite" : ""}`}
          >
            <FaStar className="coin-card__fav-icon" />
          </button>
        )}
      </div>
    </Link>
  );
}