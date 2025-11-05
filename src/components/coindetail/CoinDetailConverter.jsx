import { useState, useEffect } from "react";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import "./../../css/coindetail/CoinDetailConverter.css";

export default function CoinDetailConverter({
  currency,
  currencySymbol,
  current_price,
  image,
  symbol_coin,
}) {
  const [money, setMoney] = useState("1");
  const [converted, setConverted] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const currencyPrice = current_price[currency.toLowerCase()];
    setPrice(currencyPrice || 0);
  }, [currency, current_price]);

  useEffect(() => {
    if (price && money) {
      const converting = money * price;
      setConverted(converting);
    }
  }, [money, price]);

  return (
    <section className="coin-detail-converter__section">
      <div className="coin-detail-converter__header">
        <h4 className="coin-detail-converter__title">Crypto Converter</h4>
        <p className="coin-detail-converter__subtitle">
          Instantly calculate your {symbol_coin.toUpperCase()} value
        </p>
      </div>

      <div className="coin-detail-converter__body">
        <div className="converter__input-card">
          <div className="converter__coin">
            <img src={image} alt={`${symbol_coin} icon`} />
            <span>{symbol_coin.toUpperCase()}</span>
          </div>
          <input
            type="number"
            min="1"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            placeholder="0.00"
          />
        </div>
        <div className="converter__icon">
          <ArrowsRightLeftIcon />
        </div>
        <div className="converter__output-card">
          <p className="converter__value">
            {isNaN(converted) ? "Invalid" : converted.toLocaleString()}{" "}
            {currencySymbol}
          </p>
        </div>
      </div>
    </section>
  );
}
