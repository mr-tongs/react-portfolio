import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useTheme() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const isDark = theme === "dark";

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return { theme, isDark, toggleTheme };
}

