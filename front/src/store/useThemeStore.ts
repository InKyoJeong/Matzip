import {create} from 'zustand';

import type {ThemeMode} from '@/types';

interface ThemeState {
  theme: ThemeMode;
  isSystem: boolean;
  setTheme: (theme: ThemeMode) => void;
  setSystemTheme: (flag: boolean) => void;
}

const useThemeStore = create<ThemeState>(set => ({
  theme: 'light',
  isSystem: false,
  setTheme: (theme: ThemeMode) => {
    set({theme});
  },
  setSystemTheme: (flag: boolean) => {
    set(state => ({...state, isSystem: flag}));
  },
}));

export default useThemeStore;
