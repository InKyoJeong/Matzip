import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import RootNavigator from './src/navigations/root/RootNavigator';
import queryClient from './src/api/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
        <Toast />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
