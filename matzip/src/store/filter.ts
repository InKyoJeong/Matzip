import {colors} from '@/constants/colors';
import {create} from 'zustand';

interface FilterState {
  filters: Record<string, boolean>;
  setFilters: (filters: Record<string, boolean>) => void;
}

const useFilterStore = create<FilterState>(set => ({
  filters: {
    [colors['light'].PINK_400]: true,
    [colors['light'].YELLOW_400]: true,
    [colors['light'].GREEN_400]: true,
    [colors['light'].BLUE_400]: true,
    [colors['light'].PURPLE_400]: true,
    '1': true,
    '2': true,
    '3': true,
    '4': true,
    '5': true,
  },
  setFilters: filters => {
    set({filters});
  },
}));

export default useFilterStore;
