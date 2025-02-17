import useAuth from '../hooks/queries/useAuth';
import MainDrawerNavigator from './drawer/MainDrawerNavigator';
import AuthStackNavigator from './stack/AuthStackNavigator';

function RootNavigator() {
  const {isLogin} = useAuth();

  return <>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}
export default RootNavigator;
