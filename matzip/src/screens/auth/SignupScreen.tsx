import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';

function SignupScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField placeholder="이메일" />
        <InputField placeholder="비밀번호" />
        <InputField placeholder="비밀번호 확인" />
      </View>
      <CustomButton label="회원가입" variant="filled" size="large" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default SignupScreen;
