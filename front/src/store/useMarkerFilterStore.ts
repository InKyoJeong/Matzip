import {create} from 'zustand';

interface FilterState {
  filterItems: Record<string, boolean>;
  setFilterItems: (filterItems: Record<string, boolean>) => void;
}

const useMarkerFilterStore = create<FilterState>(set => ({
  filterItems: {
    RED: true,
    YELLOW: true,
    GREEN: true,
    BLUE: true,
    PURPLE: true,
    '1': true,
    '2': true,
    '3': true,
    '4': true,
    '5': true,
  },
  setFilterItems: (filterItems: Record<string, boolean>) => {
    set({filterItems});
  },
}));

export default useMarkerFilterStore;
