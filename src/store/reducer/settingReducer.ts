import { User } from '@/types';
import { determineDarkMode } from '@/utils';

const settingReducer = (set: any) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  darkMode: determineDarkMode(),
  setDarkMode: (isDarkMode: boolean) => set({ darkMode: isDarkMode }),
});

export default settingReducer;
