import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCoinContext } from "../logic/CoinContext.jsx";
import Error from "../components/common/Error.jsx";
import Loading from "../components/common/Loading.jsx";
import CoinCard from "./../components/common/CoinCard.jsx";
import SearchInput from "./../components/allcoins/SearchInput.jsx";
import "./../css/pages/AllCoins.css";

export default function AllCoinsPage() {
  const { coins, isLoading, error, favoriteCoins, toggleFavorite } =
    useCoinContext();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title =
      "Real-Time Cryptocurrency Tracking & Insights | CryptoCheck";
  }, []);

  if (isLoading)
    return (
      <div role="status" aria-live="polite">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div role="alert" aria-live="assertive">
        <Error />
      </div>
    );

  const filteredCoins = Array.isArray(coins)
    ? coins.filter((coin) =>
        coin.name.toUpperCase().includes(searchTerm.toUpperCase())
      )
    : [];

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.03,
      y: -5,
      boxShadow: "0px 8px 15px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <main className="all-coins" aria-labelledby="all-coins-title">
      <motion.header
        className="all-coins__header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerVariants}
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <h1 id="all-coins-title" className="title">
          Explore 100+ <span className="accent">Cryptocurrencies</span>
        </h1>
        <p className="all-coins__subtitle">
          Discover real-time prices, market caps, and trends — find your next
          investment.
        </p>
      </motion.header>

      <section
        aria-label="Search and filter cryptocurrencies"
        className="all-coins__search"
      >
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </section>

      <section
        aria-label={`List of ${filteredCoins.length} cryptocurrencies`}
        className="all-coins__grid"
      >
        {filteredCoins.length === 0 ? (
          <p role="status" aria-live="polite" className="no-results">
            No coins found for “{searchTerm}”.
          </p>
        ) : (
          filteredCoins.map((coin) => (
            <motion.div
              key={coin.id}
              variants={cardVariants}
              whileHover="hover"
              role="listitem"
            >
              <CoinCard
                coinId={coin.id}
                coinName={coin.name}
                coinSymbol={coin.symbol}
                icon={coin.image}
                marketCapRank={coin.market_cap_rank}
                price={coin.current_price}
                priceChange={coin.price_change_percentage_24h}
                fav
                isFavorite={favoriteCoins.includes(coin.id)}
                toggleFavorite={toggleFavorite}
                aria-label={`View details for ${coin.name}`}
              />
            </motion.div>
          ))
        )}
      </section>
    </main>
  );
}