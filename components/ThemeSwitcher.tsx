import { FiSun, FiMoon } from 'react-icons/fi';
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
      className="ml-0 bg-neutral-200 dark:bg-neutral-800 p-3 shadow-sm rounded-xl cursor-pointer flex"
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
    >
    { theme === 'light' ? (
      <FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
    ) : (
      <FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
    )}
    </div>
  );
}

export default ThemeSwitcher;