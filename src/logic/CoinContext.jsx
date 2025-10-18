import React, { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const CoinContext = createContext();

export const useCoinContext = () => {
  const context = useContext(CoinContext);
  if (context === undefined) {
    throw new Error("useCoinContext must be used within a CoinProvider");
  }
  return context;
};

export const CoinProvider = ({ children }) => {
  const {
    data: fetchedCoins,
    isLoading,
    error,
    refetch,
  } = useFetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true",
    []
  );

  const [coins, setCoins] = useState([]);
  const [favoriteCoins, setFavoriteCoins] = useState(() => {
    try {
      const stored = localStorage.getItem("favoriteCoins");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error reading favoriteCoins from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    if (fetchedCoins && fetchedCoins.length > 0) {
      setCoins(fetchedCoins);
    }
  }, [fetchedCoins]);

  useEffect(() => {
    try {
      localStorage.setItem("favoriteCoins", JSON.stringify(favoriteCoins));
    } catch (error) {
      console.error("Error writing favoriteCoins to localStorage:", error);
    }
  }, [favoriteCoins]);

  const toggleFavorite = (coinId) => {
    setFavoriteCoins((prevFavorites) => {
      const newFavorites = prevFavorites.includes(coinId)
        ? prevFavorites.filter((id) => id !== coinId)
        : [...prevFavorites, coinId];
      console.log("Nowe ulubione:", newFavorites);
      return newFavorites;
    });
  };

  return (
    <CoinContext.Provider
      value={{
        coins,
        setCoins,
        favoriteCoins,
        setFavoriteCoins,
        toggleFavorite,
        isLoading,
        error,
        refetch,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};
