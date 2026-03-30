/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: function () {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(function () {
    const saved = localStorage.getItem('theme') as Theme | null;
    const t =
      saved === 'dark' || saved === 'light'
        ? saved
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    // Set synchronously so CSS [data-theme] selectors apply before first paint
    document.documentElement.setAttribute('data-theme', t);
    return t;
  });

  useEffect(
    function () {
      document.documentElement.setAttribute('data-theme', theme);
    },
    [theme],
  );

  // Follow system preference changes unless user has manually overridden
  useEffect(function () {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    function handleChange(e: MediaQueryListEvent) {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    }
    mq.addEventListener('change', handleChange);
    return function () {
      mq.removeEventListener('change', handleChange);
    };
  }, []);

  function toggleTheme() {
    setTheme(function (t) {
      const next = t === 'dark' ? 'light' : 'dark';
      // Persist manual choice so system preference listener defers to it
      localStorage.setItem('theme', next);
      return next;
    });
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
