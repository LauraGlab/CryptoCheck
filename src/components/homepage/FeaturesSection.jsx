import { motion } from "framer-motion";
import Card from "../common/Card.jsx";
import { FaChartLine, FaExchangeAlt, FaSearchDollar, FaStar, FaCoins } from "react-icons/fa";
import "./../../css/homepage/FeaturesSection.css";

export default function FeaturesSection() {
  const featuresFirst = [
    {
      icon: <FaChartLine className="features__icon" />,
      title: "Live Market Data",
      description:
        "Track real-time prices, market caps, and volume of your favorite cryptocurrencies.",
    },
    {
      icon: <FaExchangeAlt className="features__icon" />,
      title: "Compare Coins",
      description:
        "Easily compare two cryptocurrencies side-by-side with clear analytics.",
    },
    {
      icon: <FaSearchDollar className="features__icon" />,
      title: "Price Converter",
      description:
        "Convert between crypto and 13 fiat currencies like PLN, EUR, USD for accurate pricing.",
    },
  ];

  const featuresSecond = [
    {
      icon: <FaStar className="features__icon" />,
      title: "Add to Favorites",
      description:
        "Save your favorite cryptocurrencies to easily track their performance.",
    },
    {
      icon: <FaCoins className="features__icon" />,
      title: "Top 100 Coins Info",
      description:
        "Access detailed information, prices, and stats for the 100 most important cryptocurrencies.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="features section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="features__container">
        <div className="features__header">
          <motion.h2 className="title" variants={cardVariants}>
            What You Can <span className="accent">Do</span>
          </motion.h2>
          <motion.p
            className="features__subtitle subtitle"
            variants={cardVariants}
          >
            Explore the key tools and features that make tracking, comparing,
            and managing cryptocurrencies simple and efficient. Stay updated
            with the latest market trends and never miss an opportunity.
          </motion.p>
        </div>

        <motion.div className="features__grid" variants={containerVariants}>
          <motion.div
            className="features__grid-first"
            variants={containerVariants}
          >
            {featuresFirst.map((feature, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card
                  icon={
                    <div>
                      {feature.icon}
                    </div>
                  }
                  header={<h4 className="card__title">{feature.title}</h4>}
                  body={
                    <p className="card__description">{feature.description}</p>
                  }
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="features__grid-second"
            variants={containerVariants}
          >
            {featuresSecond.map((feature, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card
                  icon={
                    <div>
                      {feature.icon}
                    </div>
                  }
                  header={<h4 className="card__title">{feature.title}</h4>}
                  body={
                    <p className="card__description">{feature.description}</p>
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
