import { motion } from "framer-motion";
import Card from "../common/Card.jsx";
import AboutImg1 from "./../../assets/images/aboutCryptoImg1.svg";
import AboutImg2 from "./../../assets/images/aboutCryptoImg2.svg";
import AboutImg3 from "./../../assets/images/aboutCryptoImg3.svg";
import "./../../css/homepage/AboutCrypto.css";

export default function AboutCrypto() {
  const articles = [
    {
      image: AboutImg1,
      title: "What is Blockchain Technology?",
      description:
        "An introduction to blockchain technology, how it works, and why it's revolutionary.",
      link: "https://www.ibm.com/think/topics/blockchain",
    },
    {
      image: AboutImg2,
      title: "How Cryptocurrencies Work",
      description:
        "Learn about the basics of cryptocurrencies, including mining, wallets, and transactions.",
      link: "https://www.coindesk.com/learn/what-are-cryptocurrencies",
    },
    {
      image: AboutImg3,
      title: "Blockchain Security: What You Need to Know",
      description:
        "Explore how blockchain ensures security and transparency in digital transactions.",
      link: "https://www.ibm.com/topics/blockchain-security",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: { scale: 1.03, y: -5, transition: { duration: 0.3 } },
  };

  return (
    <section className="about section">
      <motion.div
        className="about__header"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <h2 className="title">
          About <span className="accent">Crypto</span>
        </h2>
        <p className="about__subtitle subtitle">
          Discover the essentials of cryptocurrencies, how blockchain works, and
          why digital assets are transforming the way we manage and exchange
          value worldwide. Stay informed and explore key insights in this
          rapidly evolving market.
        </p>
      </motion.div>

      <motion.div
        className="about__card-wrapper"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {articles.map((article, index) => (
          <motion.a
            key={index}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            whileHover="hover"
          >
            <Card
              image={<img className="card__image" src={article.image} />}
              header={<h4 className="card__title">{article.title}</h4>}
              body={<p className="card__description">{article.description}</p>}
            />
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
