import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import {validateSignup} from '../../utils/validate';

function SignupScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          submitBehavior="submit"
          onSubmitEditing={() => passwordRef.current?.focus()}
          error={signup.errors.email}
          touched={signup.touched.email}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          secureTextEntry
          returnKeyType="next"
          placeholder="비밀번호"
          submitBehavior="submit"
          textContentType="oneTimeCode"
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          error={signup.errors.password}
          touched={signup.touched.password}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          secureTextEntry
          returnKeyType="join"
          placeholder="비밀번호 확인"
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          {...signup.getTextInputProps('passwordConfirm')}
        />
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
