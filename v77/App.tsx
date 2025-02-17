import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigations/RootNavigator';
import queryClient from './src/api/queryClient';
import {QueryClientProvider} from '@tanstack/react-query';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
