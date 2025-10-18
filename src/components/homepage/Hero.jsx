import { motion } from "framer-motion";
import Button from "./../../components/common/Button.jsx";
import blob from "./../../assets/blob.svg";
import "./../../css/homepage/Hero.css";

export default function Hero() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="hero glass section">
      <motion.div
        className="hero__container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero__content" variants={fadeInUp}>
          <motion.h1 className="hero__title" variants={fadeInUp}>
            Track & compare <br />
            <span className="accent">crypto live</span>
          </motion.h1>
          <motion.p className="hero__subtitle" variants={fadeInUp}>
            Real-time insights, trends, and performance across the crypto market
            — all in one clean dashboard.
          </motion.p>

          <Button path="/coins" text="See More" />
        </motion.div>

        <div className="hero__image-wrapper">
          <img className="hero__image" src={blob} />
        </div>
      </motion.div>
    </section>
  );
}
