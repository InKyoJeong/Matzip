import {useEffect} from 'react';

import {storageKeys} from '@/constants';
import {getEncryptStorage, setEncryptStorage} from '@/utils';
import useLegendStore from '@/store/useLegendStore';

function useLegendStorage() {
  const {isVisible, setIsVisible} = useLegendStore();

  const set = async (flag: boolean) => {
    await setEncryptStorage(storageKeys.SHOW_LEGEND, flag);
    setIsVisible(flag);
  };

  useEffect(() => {
    (async () => {
      const storedData =
        (await getEncryptStorage(storageKeys.SHOW_LEGEND)) ?? false;
      setIsVisible(storedData);
    })();
  }, [setIsVisible]);

  return {set, isVisible};
}

export default useLegendStorage;
