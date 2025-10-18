import { Link } from "react-router-dom";
import Logo from "./../../assets/logo.svg";
import "./../../css/layout/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <Link to="/" className="footer__logo-link" aria-label="Go to homepage">
            <img
              className="footer__logo"
              src={Logo}
              alt="CryptoCheck logo"
            />
            <span className="footer__title" aria-hidden="true">CryptoCheck</span>
          </Link>
          <p className="footer__tagline">
            Track and compare cryptocurrencies live — transparent, fast, and
            accurate.
          </p>
        </div>

        <nav className="footer__links" aria-label="Footer resources">
          <h3 className="footer__heading">Resources</h3>
          <ul>
            <li>
              <a
                href="https://www.coingecko.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link link"
                aria-label="CoinGecko API external link"
              >
                CoinGecko API
              </a>
            </li>
            <li>
              <Link to="/coins" className="footer-link link">
                Cryptocurrencies
              </Link>
            </li>
            <li>
              <Link to="/" className="footer-link link">
                Home
              </Link>
            </li>
          </ul>
        </nav>

        <section className="footer__about" aria-label="About CryptoCheck">
          <h3 className="footer__heading">About</h3>
          <p>
            Designed & developed by{" "}
            <a
              href="https://laura-glab.vercel.app/#/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link link"
              aria-label="Visit Laura Głąb portfolio (external link)"
            >
              Laura Głąb
            </a>
            .
          </p>
        </section>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} CryptoCheck. All rights reserved.</p>
      </div>
    </footer>
  );
}