import {createStackNavigator} from '@react-navigation/stack';
import {createStaticNavigation} from '@react-navigation/native';
import AuthHomeScreen from '../screens/auth/AuthHomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

const AuthStack = createStackNavigator({
  screens: {
    AuthHome: AuthHomeScreen,
    Login: LoginScreen,
    Signup: SignupScreen,
  },
});

const AuthNavigation = createStaticNavigation(AuthStack);

export default AuthNavigation;
