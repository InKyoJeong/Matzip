import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {ActionSheet} from '../common/ActionSheet';
import useThemeStorage from '@/hooks/useThemeStorage';

interface DarkModeActionSheetProps {
  isVisible: boolean;
  hideAction: () => void;
}

function DarkModeActionSheet({
  isVisible,
  hideAction,
}: DarkModeActionSheetProps) {
  const {theme, isSystem, setMode, setSystem} = useThemeStorage();
  const systemDefault = useColorScheme();

  const handlePressLight = () => {
    setMode('light');
    setSystem(false);
    hideAction();
  };

  const handlePressDark = () => {
    setMode('dark');
    setSystem(false);
    hideAction();
  };

  const handlePressSystem = () => {
    setMode(systemDefault ?? 'light');
    setSystem(true);
    hideAction();
  };

  return (
    <ActionSheet isVisible={isVisible} hideAction={hideAction}>
      <ActionSheet.Background>
        <ActionSheet.Container>
          <ActionSheet.Button
            onPress={handlePressLight}
            isChecked={isSystem === false && theme === 'light'}>
            라이트 모드
          </ActionSheet.Button>
          <ActionSheet.Divider />
          <ActionSheet.Button
            onPress={handlePressDark}
            isChecked={isSystem === false && theme === 'dark'}>
            다크 모드
          </ActionSheet.Button>
          <ActionSheet.Divider />
          <ActionSheet.Button
            onPress={handlePressSystem}
            isChecked={isSystem === true}>
            시스템 기본값
          </ActionSheet.Button>
        </ActionSheet.Container>
        <ActionSheet.Container>
          <ActionSheet.Button onPress={hideAction}>취소</ActionSheet.Button>
        </ActionSheet.Container>
      </ActionSheet.Background>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({});

export default DarkModeActionSheet;
