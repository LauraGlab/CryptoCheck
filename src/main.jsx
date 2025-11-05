import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { DarkModeProvider } from "./logic/DarkModeContext.jsx";
import { CoinProvider } from "./logic/CoinContext.jsx";
import { CurrencyProvider } from "./logic/CurrencyContext.jsx";
import "./css/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CoinProvider>
      <DarkModeProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </DarkModeProvider>
    </CoinProvider>
  </StrictMode>
);
