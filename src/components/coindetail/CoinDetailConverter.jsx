import { useState, useEffect } from "react";
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
    <section
      className="coin-detail-converter__section"
      aria-labelledby="crypto-converter-title"
    >
      <h4 id="crypto-converter-title" className="coin-detail-converter__title">
        Crypto Converter
      </h4>

      <div className="coin-detail-converter__converter">
        <div className="coin-detail-converter__input-group">
          <div className="coin-detail-converter__info">
            <img
              className="coin-detail-converter__img"
              src={image}
              alt={`${symbol_coin} icon`}
            />
            <p className="coin-detail-converter__symbol-text">{symbol_coin}</p>
          </div>

          <input
            className="coin-detail-converter__input"
            type="number"
            min="1"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            aria-label={`Amount of ${symbol_coin} to convert`}
            aria-describedby="converted-amount"
          />
        </div>

        <div
          className="coin-detail-converter__converted-section"
          id="converted-amount"
          aria-live="polite"
        >
          <p className="coin-detail-converter__price">
            {isNaN(converted) ? "Invalid" : converted.toLocaleString()}
          </p>
          <p className="coin-detail-converter__symbol">{currencySymbol}</p>
        </div>
      </div>
    </section>
  );
}