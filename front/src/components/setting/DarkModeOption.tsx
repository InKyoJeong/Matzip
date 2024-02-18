import React from 'react';
import {useColorScheme} from 'react-native';

import {CompoundOption} from '../common/CompoundOption';
import useThemeStorage from '@/hooks/useThemeStorage';

interface DarkModeOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function DarkModeOption({isVisible, hideOption}: DarkModeOptionProps) {
  const {theme, isSystem, setMode, setSystem} = useThemeStorage();
  const systemDefault = useColorScheme();

  const handlePressLight = () => {
    setMode('light');
    setSystem(false);
    hideOption();
  };

  const handlePressDark = () => {
    setMode('dark');
    setSystem(false);
    hideOption();
  };

  const handlePressSystem = () => {
    setMode(systemDefault ?? 'light');
    setSystem(true);
    hideOption();
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Button
            onPress={handlePressLight}
            isChecked={isSystem === false && theme === 'light'}>
            라이트 모드
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button
            onPress={handlePressDark}
            isChecked={isSystem === false && theme === 'dark'}>
            다크 모드
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button
            onPress={handlePressSystem}
            isChecked={isSystem === true}>
            시스템 기본값
          </CompoundOption.Button>
        </CompoundOption.Container>

        <CompoundOption.Container>
          <CompoundOption.Button onPress={hideOption}>
            취소
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
}

export default DarkModeOption;
