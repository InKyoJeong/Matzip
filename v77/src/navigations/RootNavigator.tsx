import MainDrawerNavigator from './drawer/MainDrawerNavigator';
import AuthStackNavigator from './stack/AuthStackNavigator';

function RootNavigator() {
  const isLoggedIn = false;

  return <>{isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}
export default RootNavigator;
