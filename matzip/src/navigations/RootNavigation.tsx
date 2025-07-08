import AuthNavigation from './AuthNavigation';
import DrawerNavigation from './DrawerNavigation';

function RootNavigation() {
  const isLogin = false;

  return <>{isLogin ? <DrawerNavigation /> : <AuthNavigation />}</>;
}

export default RootNavigation;
