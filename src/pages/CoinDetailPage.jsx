import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCurrency } from "../logic/CurrencyContext.jsx";
import useFetch from "../hooks/useFetch.jsx";
import CoinPageChange from "../components/coindetail/CoinDetailChange.jsx";
import CoinPageInfo from "../components/coindetail/CoinDetailInfo.jsx";
import CoinDetailPrice from "../components/coindetail/CoinDetailPrice.jsx";
import CoinPageSparkline from "../components/coindetail/CoinDetailSparkline.jsx";
import CoinDetailTitle from "../components/coindetail/CoinDetailTitle.jsx";
import Converter from "../components/coindetail/CoinDetailConverter.jsx";
import Error from "../components/common/Error.jsx";
import Loading from "../components/common/Loading.jsx";
import "./../css/pages/CoinDetail.css";

export default function CoinDetailPage() {
  const { id } = useParams();
  const { currency, currencySymbol } = useCurrency();
  const {
    data: coin,
    isLoading,
    error,
  } = useFetch(`https://api.coingecko.com/api/v3/coins/${id}?sparkline=true`, [
    id,
  ]);

  useEffect(() => {
    document.title = `${
      id.charAt(0).toUpperCase() + id.slice(1)
    } Coin | CryptoCheck`;
  }, [id]);

  if (error) {
    return (
      <div role="alert" aria-live="assertive">
        <Error
          title="Oops! Something went wrong"
          message="We couldn't load the coin data. Please try again later or check the URL."
        />
      </div>
    );
  }

  if (isLoading || !coin)
    return (
      <div role="status" aria-live="polite">
        <Loading />
      </div>
    );

  return (
    <main
      className="coin-detail-page"
      aria-labelledby="coin-detail-title"
      role="main"
    >
      <div className="coin-detail-page__wrapper">
        <section
          className="coin-detail-page__left"
          aria-label="Coin details and statistics"
        >
          <header
            className="coin-detail-page__main-info"
            aria-label={`${coin.name} market details`}
          >
            <div>
              <CoinDetailTitle
                imageLarge={coin.image.large}
                imageSmall={coin.image.small}
                market_cap_rank={coin.market_cap_rank}
                name={coin.name}
                symbol_coin={coin.symbol}
              />
              <CoinDetailPrice
                currency={currency}
                currencySymbol={currencySymbol}
                current_price={coin.market_data.current_price}
                high_24h={coin.market_data.high_24h}
                low_24h={coin.market_data.low_24h}
                price_change_percentage_24h_in_currency={
                  coin.market_data.price_change_percentage_24h_in_currency
                }
              />
            </div>

            <CoinPageInfo
              currency={currency}
              currencySymbol={currencySymbol}
              ath={coin.market_data.ath}
              ath_change_percentage={coin.market_data.ath_change_percentage}
              ath_date={coin.market_data.ath_date}
              atl={coin.market_data.atl}
              atl_change_percentage={coin.market_data.atl_change_percentage}
              atl_date={coin.market_data.atl_date}
              circulating_supply={coin.market_data.circulating_supply}
              fully_diluted_valuation={coin.market_data.fully_diluted_valuation}
              market_cap={coin.market_data.market_cap}
              max_supply={coin.market_data.max_supply}
              total_supply={coin.market_data.total_supply}
            />

            <CoinPageChange
              currency={currency}
              day={coin.market_data.price_change_percentage_24h_in_currency}
              halfMonth={
                coin.market_data.price_change_percentage_14d_in_currency
              }
              hour={coin.market_data.price_change_percentage_1h_in_currency}
              month={coin.market_data.price_change_percentage_30d_in_currency}
              week={coin.market_data.price_change_percentage_7d_in_currency}
              year={coin.market_data.price_change_percentage_1y_in_currency}
            />
          </header>
        </section>
        <aside
          className="coin-detail-page__right"
          aria-label={`${coin.name} charts and conversion tools`}
        >
          <section
            className="coin-detail-page__sparkline"
            aria-label={`${coin.name} 7-day price trend`}
          >
            <CoinPageSparkline
              day={coin.market_data.price_change_percentage_24h_in_currency.usd}
              name={coin.name}
              sparkline={coin.market_data.sparkline_7d.price}
            />
          </section>

          <section
            className="coin-detail-page__converter"
            aria-label={`Convert ${coin.name} to and from ${currency}`}
          >
            <Converter
              currency={currency}
              currencySymbol={currencySymbol}
              current_price={coin.market_data.current_price}
              image={coin.image.small}
              symbol_coin={coin.symbol}
            />
          </section>
        </aside>
      </div>
    </main>
  );
}