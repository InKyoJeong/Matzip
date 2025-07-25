import {QueryClientProvider} from '@tanstack/react-query';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';

import RootNavigation from './src/navigations/RootNavigation';
import queryClient from '@/api/queryClient';
import {colors} from '@/constants/colors';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: colors.BLUE_500}}
      text1Style={{fontSize: 14}}
      text2Style={{fontSize: 12}}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: colors.RED_500}}
      text1Style={{fontSize: 14}}
      text2Style={{fontSize: 12}}
    />
  ),
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

export default App;
