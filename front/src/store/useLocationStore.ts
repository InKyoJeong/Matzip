import {create} from 'zustand';
import {LatLng} from 'react-native-maps';

interface LocationState {
  moveLocation: LatLng | null;
  setMoveLocation: (location: LatLng) => void;
}

const useLocationStore = create<LocationState>(set => ({
  moveLocation: null,
  setMoveLocation: (moveLocation: LatLng) => {
    set({moveLocation});
  },
}));

export default useLocationStore;
