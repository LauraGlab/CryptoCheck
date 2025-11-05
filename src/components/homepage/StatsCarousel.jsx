import { motion } from "framer-motion";
import "./../../css/homepage/StatsCarousel.css";

const stats = [
  { number: "250+", label: "Coins" },
  { number: "24/7", label: "Updates" },
  { number: "13", label: "Currencies" },
  { number: "100K+", label: "Users" },
  { number: "99.9%", label: "Uptime" },
];

export default function StatsCarousel() {
  return (
    <section className="stats-section section">
      <motion.div
        className="stats-carousel"
        animate={{ x: ["0%", "-20%", "0%"] }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
      >
        {stats.map((stat, i) => (
          <div key={i} className="stat-item">
            <span className="stat-label">
              {stat.number} {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
