import { useTheme } from "../hooks/useTheme";

function ThemeToggleButton() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`btn theme-toggle ${isDark ? "is-dark" : "is-light"}`}
      style={{ padding: "5px 10px" }}
      aria-label="Toggle theme"
    >
      <span className="theme-icon" aria-hidden="true">
        {isDark ? "🌞" : "🌙"}
      </span>
    </button>
  );
}

export default ThemeToggleButton;

