import CoinDetailTitle from "./CoinDetailTitle.jsx";
import CoinDetailPrice from "./CoinDetailPrice.jsx";
import "./../../css/coindetail/CoinDetailHeader.css";

export default function CoinDetailHeader(props) {
  return (
    <section className="glass coin-detail-header">
      <div className="coin-detail-header__main">
        <CoinDetailTitle {...props} />
        <CoinDetailPrice {...props} />
      </div>

      <div className="coin-detail-header__meta">
        <p className="coin-detail-header__note">
          Live market data updated every 60 seconds
        </p>
      </div>
    </section>
  );
}
