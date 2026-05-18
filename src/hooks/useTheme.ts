import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useTheme() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const isDark = theme === 'dark';

  return { isDark, toggle };
}
