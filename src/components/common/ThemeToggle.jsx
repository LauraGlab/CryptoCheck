import { useDarkMode } from "../../logic/DarkModeContext";

export default function ThemeToggle({ onClose, ...props }) {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleClick = () => {
    toggleDarkMode();
    if (onClose) onClose();
  };

  return (
    <button
      className="header__menu-item"
      onClick={handleClick}
      aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
      {...props}
    >
      <p className="header__menu-text link">
        {darkMode ? "Light" : "Dark"} mode
      </p>
    </button>
  );
}