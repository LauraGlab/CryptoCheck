import { useEffect } from "react";
import { useCoinContext } from "../logic/CoinContext.jsx";
import AboutCrypto from "../components/homepage/AboutCrypto.jsx";
import Error from "../components/common/Error.jsx";
import FeaturesSection from "../components/homepage/FeaturesSection.jsx";
import Hero from "../components/homepage/Hero.jsx";
import Loading from "../components/common/Loading.jsx";
import StatsCarousel from "../components/homepage/StatsCarousel.jsx";
import TrendingCoins from "../components/homepage/TrendingCoins.jsx";
import "./../css/pages/Home.css";

export default function HomePage() {
  const { isLoading, error } = useCoinContext();

  useEffect(() => {
    document.title =
      "Real-Time Cryptocurrency Tracking & Insights | CryptoCheck";
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="home">
      <main className="home__main">
        <Hero />
        <StatsCarousel/>
        <FeaturesSection />
        <TrendingCoins />
        <AboutCrypto />
      </main>
    </div>
  );
}
