import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

function useAppState() {
  const appState = useRef(AppState.currentState);
  const [isComeback, setIsComeback] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (!isComeback) setIsComeback(true);
      }

      if (appState.current.match(/active/) && nextAppState === 'background') {
        if (isComeback) setIsComeback(false);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {isComeback};
}

export default useAppState;
