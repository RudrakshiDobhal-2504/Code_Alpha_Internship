import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext(null);

const THEME_KEY = "codecart_theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved =
        localStorage.getItem(THEME_KEY);

      if (
        saved === "dark" ||
        saved === "light"
      ) {
        return saved;
      }

      return "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme =
      theme;

    document.documentElement.style.colorScheme =
      theme;

    try {
      localStorage.setItem(
        THEME_KEY,
        theme
      );
    } catch {
      // Ignore storage errors.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "light"
        ? "dark"
        : "light"
    );
  };

  const setLightTheme = () =>
    setTheme("light");

  const setDarkTheme = () =>
    setTheme("dark");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "dark",
        toggleTheme,
        setLightTheme,
        setDarkTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider."
    );
  }

  return context;
}