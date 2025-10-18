import React, { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [currencySymbol, setCurrencySymbol] = useState("$");

  useEffect(() => {
    const stored = localStorage.getItem("currency");
    if (stored) setCurrency(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("currency", currency);

    const symbolMap = {
      usd: "$",
      eur: "€",
      cny: "¥",
      jpy: "¥",
      gbp: "£",
      aud: "A$",
      cad: "C$",
      chf: "CHF",
      krw: "₩",
      sgd: "S$",
      pln: "PLN",
    };

    setCurrencySymbol(symbolMap[currency.toLowerCase()] || currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};
