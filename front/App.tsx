import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import CodePush from 'react-native-code-push';

import RootNavigator from './src/navigations/root/RootNavigator';
import queryClient from './src/api/queryClient';
import {colors} from '@/constants';
import useThemeStorage from '@/hooks/useThemeStorage';
import useCodePush from '@/hooks/useCodePush';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: colors['light'].BLUE_500}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: colors['light'].RED_500}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
};

function App() {
  const {theme} = useThemeStorage();
  const {hasUpdate, syncProgress} = useCodePush();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer>
        {hasUpdate ? (
          <View>
            <Text>업데이트중...</Text>
          </View>
        ) : (
          <RootNavigator />
        )}

        <Toast config={toastConfig} />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default CodePush(App);
