import {create} from 'zustand';
import {LatLng} from 'react-native-maps';

interface LocationState {
  moveLocation: LatLng | null;
  selectLocation: LatLng | null;
  setMoveLocation: (location: LatLng) => void;
  setSelectLocation: (location: LatLng) => void;
}

const useLocationStore = create<LocationState>(set => ({
  moveLocation: null,
  selectLocation: null,
  setMoveLocation: (moveLocation: LatLng) => {
    set(state => ({...state, moveLocation}));
  },
  setSelectLocation: (selectLocation: LatLng) => {
    set(state => ({...state, selectLocation}));
  },
}));

export default useLocationStore;
