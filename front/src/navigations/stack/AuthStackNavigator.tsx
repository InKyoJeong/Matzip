import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthHomeScreen from '../../screens/AuthHomeScreen';
import LoginScreen from '../../screens/LoginScreen';
import {authNaviagtions} from '../../constants';
import SignScreen from '../../screens/SignScreen';

export type AuthStackParamList = {
  [authNaviagtions.AUTH_HOME]: undefined;
  [authNaviagtions.LOGIN]: undefined;
  [authNaviagtions.SIGNUP]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={authNaviagtions.AUTH_HOME}
        component={AuthHomeScreen}
      />
      <Stack.Screen name={authNaviagtions.LOGIN} component={LoginScreen} />
      <Stack.Screen name={authNaviagtions.SIGNUP} component={SignScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;
