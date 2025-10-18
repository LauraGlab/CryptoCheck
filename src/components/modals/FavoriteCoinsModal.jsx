import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import ThreeDots from "./../../assets/icons/icon-threeDots.svg";
import "./../../css/modals/FavoriteCoinsModal.css";

export default function FavoriteCoinsModal({
  handleClose,
  favoriteCoins,
  favoriteCoinIds,
  setFavoriteCoinIds,
}) {
  const [isOpen, setIsOpen] = useState(null);

  useEffect(() => {
    const handleOutsideModalClick = (e) => {
      if (e.target.classList.contains("favorite-coins")) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideModalClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideModalClick);
    };
  }, [handleClose]);

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest(".favorite-coins__window")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isOpen]);

  const toggleMenu = (coinId) => {
    setIsOpen((prev) => (prev === coinId ? null : coinId));
  };

  const deleteFavCoin = (favCoinId) => {
    setFavoriteCoinIds(favoriteCoinIds.filter((id) => id !== favCoinId));
  };

  return (
    <div
      className="bckgr favorite-coins"
      role="dialog"
      aria-label="Favorite coins menu"
      aria-modal="true"
    >
      <AnimatePresence>
        <motion.div
          key="modal"
          className="window favorite-coins__window"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
        >
          {favoriteCoins.length === 0 ? (
            <div
              className="favorite-coins__empty"
              aria-label="No favorite coins"
            >
              <p>Start by selecting your favorite coins to view them here.</p>
            </div>
          ) : (
            <ul
              className="favorite-coins__list"
              aria-label="List of favorite coins"
            >
              {favoriteCoins.map((coin) => (
                <li
                  className="favorite-coins__item glass"
                  key={coin.id}
                  aria-label={`Favorite coin ${coin.name}`}
                >
                  <div className="favorite-coins__details">
                    <p
                      className="favorite-coins__rank"
                      aria-label={`Rank ${coin.market_cap_rank}`}
                    >
                      {coin.market_cap_rank}
                    </p>
                    <img
                      className="favorite-coins__image"
                      src={coin.image}
                      alt={`${coin.name} icon`}
                    />
                    <p className="favorite-coins__name">{coin.name}</p>
                  </div>

                  <div className="favorite-coins__stats">
                    <p
                      className="favorite-coins__price"
                      aria-label={`Current price ${coin.current_price} dollars`}
                    >
                      ${coin.current_price}
                    </p>

                    <button
                      className="favorite-coins__menu-button"
                      onClick={() => toggleMenu(coin.id)}
                      aria-label={`Open menu for ${coin.name}`}
                    >
                      <SVG
                        className="favorite-coins__menu-icon"
                        src={ThreeDots}
                        role="img"
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen === coin.id && (
                      <AnimatePresence>
                        <motion.div
                          key="menu"
                          className="favorite-coins__menu"
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          initial="hidden"
                          animate="visible"
                          aria-label={`Options for ${coin.name}`}
                        >
                          <Link
                            className="favorite-coins__link"
                            to={`/${coin.id}`}
                            onClick={handleClose}
                            aria-label={`View more info about ${coin.name}`}
                          >
                            More Info
                          </Link>

                          <hr className="favorite-coins__divider" />

                          <button
                            className="favorite-coins__delete"
                            onClick={() => deleteFavCoin(coin.id)}
                            aria-label={`Remove ${coin.name} from favorites`}
                          >
                            Delete coin
                          </button>
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}