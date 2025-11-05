import { useCoinContext } from "../../logic/CoinContext.jsx";
import { motion } from "framer-motion";
import CoinListGrid from "./CoinListGrid.jsx";
import "./../../css/homepage/TrendingCoins.css";

export default function TrendingCoins() {
  const { coins } = useCoinContext();

  const filteredCoins = Array.isArray(coins)
    ? coins.filter((coin) => coin.name.toLowerCase())
    : [];

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.03, y: -5, transition: { duration: 0.3 } },
  };

  return (
    <section className="trending section">
      <motion.div
        className="trending__header"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="title">Top 8 Popular Coins in <span className="accent">the Crypto Market</span></h2>
        <p className="subtitle">
          Cryptocurrencies have captured global attention, offering new ways to
          trade, invest, and transfer value. With innovative platforms and
          rapidly evolving technology, these coins continue to shape the future
          of digital finance. Staying informed can help you make smarter
          decisions in this fast-moving market.
        </p>
      </motion.div>

      <motion.div
        className="trending__grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={itemVariants}>
          <CoinListGrid coins={filteredCoins.slice(0, 8)} />
        </motion.div>
      </motion.div>
    </section>
  );
}