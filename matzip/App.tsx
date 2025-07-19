import {QueryClientProvider} from '@tanstack/react-query';
import RootNavigation from './src/navigations/RootNavigation';
import queryClient from '@/api/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
    </QueryClientProvider>
  );
}

export default App;
