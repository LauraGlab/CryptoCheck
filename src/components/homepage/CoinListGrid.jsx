import CoinCard from "./../common/CoinCard.jsx";
import "./../../css/homepage/CoinListGrid.css";

export default function CoinListGrid({ coins }) {
  return (
    <div className="coinlist-grid">
      {coins.map((coin) => (
        <CoinCard
          key={coin.id}
          coinId={coin.id}
          coinName={coin.name}
          coinSymbol={coin.symbol}
          icon={coin.image}
          marketCapRank={coin.market_cap_rank}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          sparkline={coin.sparkline_in_7d?.price || []}
          isFavorite={false}
          toggleFavorite={() => {}}
          onClick={() => {}}
        />
      ))}
    </div>
  );
}
