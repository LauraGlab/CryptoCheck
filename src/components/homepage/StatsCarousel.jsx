import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "./../../css/homepage/StatsCarousel.css";

const stats = [
  { number: "250+", label: "Coins" },
  { number: "24/7", label: "Updates" },
  { number: "13", label: "Currencies" },
  { number: "100K+", label: "Users" },
  { number: "99.9%", label: "Uptime" },
];

export default function StatsCarousel() {
  const controls = useAnimation();

  useEffect(() => {
    const animate = async () => {
      while (true) {
        await controls.start({
          x: "-20%",
          transition: { duration: 6, ease: "easeInOut" },
        });
        await controls.start({
          x: "0%",
          transition: { duration: 6, ease: "easeInOut" },
        });
      }
    };
    animate();
  }, [controls]);

  return (
    <section className="stats-section section">
      <motion.div className="stats-carousel" animate={controls}>
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
