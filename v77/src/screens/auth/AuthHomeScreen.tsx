import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {authNaviagtions} from '../../constants/navigations';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import CustomButton from '../../components/CustomButton';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNaviagtions.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <CustomButton
          label="로그인하기"
          onPress={() => navigation.navigate(authNaviagtions.LOGIN)}
        />
        <CustomButton
          label="회원가입하기"
          variant="outlined"
          onPress={() => navigation.navigate(authNaviagtions.SIGNUP)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
