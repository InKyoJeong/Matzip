import MainDrawerNavigator from './drawer/MainDrawerNavigator';
import AuthStackNavigator from './stack/AuthStackNavigator';

function RootNavigator() {
  const isLoggedIn = true;

  return <>{isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}
export default RootNavigator;
