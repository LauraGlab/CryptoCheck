import { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import { useCoinContext } from "../../logic/CoinContext.jsx";
import ArrowDown from "./../../assets/icons/icon-arrow-down.svg";
import ArrowUp from "./../../assets/icons/icon-arrow-up.svg";
import Compare from "./../../assets/icons/icon-compare.svg";
import "./../../css/modals/CompareCryptoModal.css";

export default function CompareCryptoModal({ handleClose }) {
  const { coins } = useCoinContext();
  const [coinData, setCoinData] = useState({
    coin1: { selectedCoin: null, searchTerm: "", inputValue: "" },
    coin2: { selectedCoin: null, searchTerm: "", inputValue: "" },
  });
  const [openInput, setOpenInput] = useState(null);

  useEffect(() => {
    const handleOutsideModalClick = (e) => {
      if (e.target.classList.contains("compare-crypto")) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideModalClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideModalClick);
  }, [handleClose]);

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest(".compare-crypto__options-section")) {
        setOpenInput(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filterCoins = (searchTerm) =>
    coins.filter((coin) =>
      coin.name.toUpperCase().includes(searchTerm.toUpperCase())
    );

  const handleInputChange = (coinKey) => (e) => {
    setCoinData((prev) => ({
      ...prev,
      [coinKey]: {
        ...prev[coinKey],
        searchTerm: e.target.value,
      },
    }));
    setOpenInput(coinKey);
  };

  const handleSelectCoin = (coinKey) => (coin) => {
    setCoinData((prev) => ({
      ...prev,
      [coinKey]: {
        selectedCoin: coin,
        inputValue: `${coin.name} - ${coin.current_price}$`,
        searchTerm: "",
      },
    }));
    setOpenInput(null);
  };

  const calculateHypotheticalPrice = () => {
    const { selectedCoin: c1 } = coinData.coin1;
    const { selectedCoin: c2 } = coinData.coin2;
    if (!c1 || !c2) return null;
    if (!c2.market_cap || !c1.circulating_supply) return null;
    return c2.market_cap / c1.circulating_supply;
  };

  const calculateRatio = () => {
    const { selectedCoin: c1 } = coinData.coin1;
    const { selectedCoin: c2 } = coinData.coin2;
    if (!c1 || !c2) return null;
    if (!c1.current_price) return null;
    return c2.market_cap / c1.circulating_supply / c1.current_price;
  };

  const hypotheticalPrice = calculateHypotheticalPrice();
  const ratio = calculateRatio();

  return (
    <div
      className="bckgr compare-crypto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compareCryptoTitle"
      tabIndex="-1"
      onKeyDown={(e) => e.key === "Escape" && handleClose()}
    >
      <div className="compare-crypto__window glass">
        <div className="compare-crypto__title-section">
          <h2 className="compare-crypto__title" id="compareCryptoTitle">
            What if A was as big as B?
          </h2>
        </div>

        {["coin1", "coin2"].map((coinKey, idx) => (
          <div className="compare-crypto__input-section" key={coinKey}>
            <p className="compare-crypto__select-text">
              Select {coinKey === "coin1" ? "A" : "B"}
            </p>
            <div className="compare-crypto__field">
              <input
                className="compare-crypto__input glass"
                aria-label={`Search or select coin ${
                  coinKey === "coin1" ? "A" : "B"
                }`}
                value={
                  openInput === coinKey
                    ? coinData[coinKey].searchTerm
                    : coinData[coinKey].inputValue
                }
                onChange={handleInputChange(coinKey)}
                onClick={() => setOpenInput(coinKey)}
                placeholder="Search or select a coin"
              />
              <div className="compare-crypto__arrow-icon-section">
                <SVG
                  src={openInput === coinKey ? ArrowUp : ArrowDown}
                  className="compare-crypto__arrow-icon"
                  aria-hidden="true"
                />
              </div>
            </div>

            {openInput === coinKey && (
              <div className="compare-crypto__options-section" role="listbox">
                {filterCoins(coinData[coinKey].searchTerm).length > 0 ? (
                  filterCoins(coinData[coinKey].searchTerm).map((coin) => (
                    <button
                      key={coin.id}
                      className="compare-crypto__option-coin"
                      onClick={() => handleSelectCoin(coinKey)(coin)}
                      role="option"
                      aria-selected={
                        coinData[coinKey].selectedCoin?.id === coin.id
                      }
                    >
                      <img
                        className="compare-crypto__option-coin-img"
                        src={coin.image}
                        alt={`${coin.name} icon`}
                      />
                      {coin.name} ({coin.symbol}) - {coin.current_price}$
                    </button>
                  ))
                ) : (
                  <div className="compare-crypto__no-results" role="alert">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="compare-crypto__icon-section">
          <SVG
            className="compare-crypto__icon"
            src={Compare}
            aria-hidden="true"
          />
        </div>

        {hypotheticalPrice !== null && ratio !== null ? (
          <div className="compare-crypto__comparison-result">
            <p>
              <strong>{coinData.coin1.selectedCoin?.name}</strong> price with
              the market cap of{" "}
              <strong>{coinData.coin2.selectedCoin?.name}</strong>:
            </p>
            <p className="compare-crypto__result-formula">
              <strong>${hypotheticalPrice.toFixed(2)}</strong>{" "}
              <span
                style={{ color: ratio >= 1 ? "var(--green)" : "var(--red)" }}
              >
                ({ratio.toFixed(2)})x
              </span>
            </p>
          </div>
        ) : (
          <div className="compare-crypto__no-selection">
            <p>Pick two coins to see the magic ✨</p>
          </div>
        )}
      </div>
    </div>
  );
}