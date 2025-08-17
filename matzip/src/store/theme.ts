import {create} from 'zustand';

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  isSystem: boolean;
  setTheme: (theme: Theme) => void;
  setSystemTheme: (isSystem: boolean) => void;
}

const useThemeStore = create<ThemeState>(set => ({
  theme: 'light',
  isSystem: false,
  setTheme: (theme: Theme) => {
    set(state => ({...state, theme}));
  },
  setSystemTheme: (isSystem: boolean) => {
    set(state => ({...state, isSystem}));
  },
}));

export default useThemeStore;
