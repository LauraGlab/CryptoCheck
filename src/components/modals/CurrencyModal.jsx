import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useCurrency } from "../../logic/CurrencyContext.jsx";
import USD from "../../assets/flags/united-states.svg";
import EUR from "../../assets/flags/european-union-europe.svg";
import CNY from "../../assets/flags/china.svg";
import JPY from "../../assets/flags/japan.svg";
import GBP from "../../assets/flags/united-kingdom-uk.svg";
import AUD from "../../assets/flags/australia.svg";
import CAD from "../../assets/flags/canada.svg";
import CHF from "../../assets/flags/switzerland.svg";
import KRW from "../../assets/flags/south-korea.svg";
import SGD from "../../assets/flags/singapore.svg";
import PLN from "../../assets/flags/poland.svg";
import "./../../css/modals/CurrencyModal.css";

const currencies = [
  { code: "USD", flag: USD, alt: "US flag" },
  { code: "EUR", flag: EUR, alt: "EU flag" },
  { code: "CNY", flag: CNY, alt: "China flag" },
  { code: "JPY", flag: JPY, alt: "Japan flag" },
  { code: "GBP", flag: GBP, alt: "UK flag" },
  { code: "AUD", flag: AUD, alt: "Australia flag" },
  { code: "CAD", flag: CAD, alt: "Canada flag" },
  { code: "CHF", flag: CHF, alt: "Switzerland flag" },
  { code: "KRW", flag: KRW, alt: "South Korea flag" },
  { code: "SGD", flag: SGD, alt: "Singapore flag" },
  { code: "PLN", flag: PLN, alt: "Poland flag" },
];

export default function CurrencyModal({ handleClose }) {
  const { currency, setCurrency } = useCurrency();

  const handleCurrencyChange = (code) => {
    setCurrency(code);
    handleClose();
  };

  useEffect(() => {
    const closeOnClickOutside = (e) => {
      if (e.target.classList.contains("currency-menu")) handleClose();
    };
    document.addEventListener("mousedown", closeOnClickOutside);
    return () => document.removeEventListener("mousedown", closeOnClickOutside);
  }, [handleClose]);

  return (
    <div className="bckgr currency-menu">
      <AnimatePresence>
        <motion.div
          key="window"
          className="currency-menu__window"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.25 }}
        >
          <h2 className="currency-menu__title">Select Your Currency</h2>
          <ul className="currency-menu__list">
            {currencies.map(({ code, flag, alt }) => (
              <li key={code} className="currency-menu__item">
                <button
                  className={`currency-menu__btn ${
                    currency === code ? "currency-menu__btn--active" : ""
                  }`}
                  onClick={() => handleCurrencyChange(code)}
                >
                  <img className="currency-menu__flag" src={flag} alt={alt} />
                  <span>{code}</span>
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}