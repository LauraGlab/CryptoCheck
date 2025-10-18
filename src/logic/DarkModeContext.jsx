import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const root = document.documentElement;
    if (stored === "dark") {
      setDarkMode(true);
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      const root = document.documentElement;
      root.classList.toggle("dark", next);
      root.classList.toggle("light", !next);
      return next;
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export { DarkModeProvider, useDarkMode };