import CoinCard from "./CoinCard.jsx";

export default function CoinList({ coins }) {

  return (
    <div className="trending__list">
      <div className="trending__legend">
        <p className="legend__rank">#</p>
        <p className="legend__name">Name</p>
        <p className="legend__price">Price</p>
        <p className="legend__change">24h Change</p>
        <p className="legend__graph">Graph (7d)</p>
      </div>
      {coins.length === 0 ? (
        <p className="trending__loading-text">No coins found...</p>
      ) : (
        coins.map((coin) => (
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
          />
        ))
      )}
    </div>
  );
}
