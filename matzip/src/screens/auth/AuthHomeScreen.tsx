import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

function AuthHomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text onPress={() => navigation.navigate('Login')}>로그인으로 이동</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
