import {useEffect, useState} from 'react';

import {storageKeys} from '@/constants';
import type {Marker} from '@/types';
import {getEncryptStorage, setEncryptStorage} from '@/utils';
import useMarkerFilterStore from '@/store/useMarkerFilterStore';

const initialFilters = {
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
};

function useMarkerFilterStorage() {
  const {filterItems, setFilterItems} = useMarkerFilterStore();

  const set = async (items: Record<string, boolean>) => {
    await setEncryptStorage(storageKeys.MARKER_FILTER, items);
    setFilterItems(items);
  };

  const transformFilteredMarker = (markers: Marker[]) => {
    return markers.filter(marker => {
      return (
        filterItems[marker.color] === true &&
        filterItems[String(marker.score)] === true
      );
    });
  };

  useEffect(() => {
    (async () => {
      const storedData =
        (await getEncryptStorage(storageKeys.MARKER_FILTER)) ?? initialFilters;
      setFilterItems(storedData);
    })();
  }, []);

  return {set, items: filterItems, transformFilteredMarker};
}

export default useMarkerFilterStorage;
