import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {authNaviagtions} from '../constants';
import {AuthStackParamList} from '../navigations/stack/AuthStackNavigator';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNaviagtions.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <View>
      <Button
        onPress={() => navigation.navigate('Login')}
        title="로그인화면으로 이동"
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
