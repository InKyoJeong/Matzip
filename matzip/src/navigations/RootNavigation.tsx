import useAuth from '@/hooks/queries/useAuth';
import AuthNavigation from './AuthNavigation';
import DrawerNavigation from './DrawerNavigation';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';

function RootNavigation() {
  const {isLogin} = useAuth();

  return (
    <RetryErrorBoundary>
      {isLogin ? <DrawerNavigation /> : <AuthNavigation />}
    </RetryErrorBoundary>
  );
}

export default RootNavigation;
