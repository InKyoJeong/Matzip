import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {authNaviagtions} from '../../constants';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNaviagtions.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView>
      <Button
        onPress={() => navigation.navigate(authNaviagtions.LOGIN)}
        title="로그인화면으로 이동"
      />
      <Button
        title="회원가입 이동"
        onPress={() => navigation.navigate(authNaviagtions.SIGNUP)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
