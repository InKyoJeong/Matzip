import useAuth from '@/hooks/queries/useAuth';
import DrawerNavigation from './DrawerNavigation';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import AuthNavigation from './AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';

function RootNavigation() {
  const {isLogin} = useAuth();

  return (
    <RetryErrorBoundary>
      <NavigationContainer>
        {isLogin ? <DrawerNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </RetryErrorBoundary>
  );
}

export default RootNavigation;
