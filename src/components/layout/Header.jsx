import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCoinContext } from "../../logic/CoinContext.jsx";
import { useCurrency } from "../../logic/CurrencyContext.jsx";
import CompareCryptoModal from "../modals/CompareCryptoModal.jsx";
import CurrencyModal from "../modals/CurrencyModal.jsx";
import FavoriteCoinsModal from "../modals/FavoriteCoinsModal.jsx";
import ThemeToggle from "./../common/ThemeToggle.jsx";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/logo.svg";
import "./../../css/layout/Header.css";

export default function Header() {
  const location = useLocation();
  const { coins, favoriteCoins, setFavoriteCoins } = useCoinContext();
  const { currency, setCurrency } = useCurrency();

  const [menuOpen, setMenuOpen] = useState(false);
  const [modals, setModals] = useState({
    portfolio: false,
    compare: false,
    currency: false,
  });
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  const favoriteCoinsFullData = coins.filter((coin) =>
    favoriteCoins.includes(coin.id)
  );

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const closeModal = () => {
    setModals({ portfolio: false, compare: false, currency: false });
    document.body.style.overflow = "auto";
  };

  const openModal = (type) => {
    setMenuOpen(false);
    setModals({
      portfolio: type === "portfolio",
      compare: type === "compare",
      currency: type === "currency",
    });
    document.body.style.overflow = "hidden";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setMenuOpen(false);
      closeModal();
    }
  };

  return (
    <header
      className={`header ${scrolled ? "header--scrolled" : ""}`}
      onKeyDown={handleKeyDown}
    >
      <div className="header__container-wrapper">
        <div className="header__container">
          <div className="header__logo">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <img
                style={{ width: "30px", marginRight: "10px" }}
                src={Logo}
                alt="CryptoCheck Logo"
              />
              <h1 className="header__logo-title">CryptoCheck</h1>
            </Link>
          </div>

          <div className="header__hamburger-wrapper">
            {location.pathname !== "/" && location.pathname !== "/coins" && (
              <button
                className="header__menu-item"
                onClick={() => openModal("currency")}
                aria-haspopup="dialog"
                aria-expanded={modals.currency}
                aria-label={`Change currency from ${currency}`}
              >
                <p className="header__menu-text-currency link">{currency}</p>
              </button>
            )}

            <button
              className="header__hamburger glass"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="header-menu-drawer"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.nav
                  id="header-menu-drawer"
                  ref={menuRef}
                  className="header__menu-drawer glass"
                  role="menu"
                  aria-label="Main navigation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Link
                    to="/coins"
                    className="header__menu-item"
                    onClick={() => setMenuOpen(false)}
                    role="menuitem"
                  >
                    <p className="header__menu-text link">Cryptocurrencies</p>
                  </Link>

                  <button
                    className="header__menu-item"
                    onClick={() => openModal("portfolio")}
                    role="menuitem"
                  >
                    <p className="header__menu-text link">Portfolio</p>
                  </button>

                  <button
                    className="header__menu-item"
                    onClick={() => openModal("compare")}
                    role="menuitem"
                  >
                    <p className="header__menu-text link">Compare</p>
                  </button>

                  <ThemeToggle onClose={() => setMenuOpen(false)} />
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {modals.currency && (
        <CurrencyModal handleClose={closeModal} setCurrency={setCurrency} />
      )}
      {modals.portfolio && (
        <FavoriteCoinsModal
          handleClose={closeModal}
          favoriteCoins={favoriteCoinsFullData}
          favoriteCoinIds={favoriteCoins}
          setFavoriteCoinIds={setFavoriteCoins}
        />
      )}
      {modals.compare && <CompareCryptoModal handleClose={closeModal} />}
    </header>
  );
}