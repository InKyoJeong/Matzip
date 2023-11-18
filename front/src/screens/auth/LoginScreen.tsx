import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';

function LoginScreen() {
  const login = useForm({
    initialValue: {email: '', password: ''},
  });

  const handleSubmit = () => {
    console.log('login.values', login.values);
  };

  // console.log('getTextInputProps', login.getTextInputProps('email'));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error={'이메일을 입력하세요'}
          touched={login.touched.email}
          inputMode="email"
          {...login.getTextInputProps('email')}
          // value={values.email}
          // onChangeText={text => handleChangeText('email', text)}
          // onBlur={() => handleBlur('email')}
        />
        <InputField
          placeholder="비밀번호"
          error={'비밀번호를 입력하세요'}
          touched={login.touched.password}
          secureTextEntry
          {...login.getTextInputProps('password')}
          // value={values.password}
          // onChangeText={text => handleChangeText('password', text)}
          // onBlur={() => handleBlur('password')}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
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
