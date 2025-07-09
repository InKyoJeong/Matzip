import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';
import {validateLogin} from '@/utils/validation';

function LoginScreen() {
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          touched={login.touched.email}
          error={login.errors.email}
          {...login.getTextInputProps('email')}
        />
        <InputField
          secureTextEntry
          textContentType="oneTimeCode"
          placeholder="비밀번호"
          maxLength={20}
          touched={login.touched.password}
          error={login.errors.password}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton label="로그인" variant="filled" size="large" />
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

export default LoginScreen;
