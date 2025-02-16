import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import {validateLogin} from '../../utils/validate';

function LoginScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          inputMode="email"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => passwordRef.current?.focus()}
          error={login.errors.email}
          touched={login.touched.email}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          secureTextEntry
          placeholder="비밀번호"
          returnKeyType="join"
          error={login.errors.password}
          touched={login.touched.password}
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
