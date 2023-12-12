import {useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

function useAppState() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isComeback, setIsComeback] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          setIsComeback(true);
        }

        if (appState.current.match(/active/) && nextAppState === 'background') {
          setIsComeback(false);
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return {appStateVisible, isComeback};
}

export default useAppState;
