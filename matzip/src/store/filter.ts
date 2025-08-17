import {colors} from '@/constants/colors';
import {create} from 'zustand';

interface FilterState {
  filters: Record<string, boolean>;
  setFilters: (filters: Record<string, boolean>) => void;
}

const useFilterStore = create<FilterState>(set => ({
  filters: {
    [colors.PINK_400]: true,
    [colors.YELLOW_400]: true,
    [colors.GREEN_400]: true,
    [colors.BLUE_400]: true,
    [colors.PURPLE_400]: true,
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
