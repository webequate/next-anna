import {
  FaSun,
	FaMoon
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const [ mounted, setMounted ] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="ml-0 text-xl text-ternary-dark dark:text-secondary-light hover:text-primary-light dark:hover:text-primary-light bg-primary-light dark:bg-primary-dark hover:bg-accent-light dark:hover:bg-accent-light p-3 shadow-sm rounded-xl cursor-pointer flex duration-300"
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
    >
    { theme === 'light' ? (
      <FaMoon className="text-xl" />
    ) : (
      <FaSun className="text-xl" />
    )}
    </div>
  );
}

export default ThemeSwitcher;