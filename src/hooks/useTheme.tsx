import { useSettingsStore } from '@/store';
import { useEffect } from 'react';

export default function useTheme() {
  const { setDarkMode, darkMode } = useSettingsStore();

  useEffect(() => {
    setDarkMode(darkMode);
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode, setDarkMode]);
}
