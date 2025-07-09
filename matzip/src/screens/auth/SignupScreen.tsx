import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';

import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';
import {validateSignup} from '@/utils/validation';
import {useRef} from 'react';

function SignupScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });

  const handleSubmit = () => {
    console.log('signup.values', signup.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          returnKeyType="next"
          inputMode="email"
          submitBehavior="submit"
          onSubmitEditing={() => passwordRef.current?.focus()}
          touched={signup.touched.email}
          error={signup.errors.email}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          secureTextEntry
          textContentType="oneTimeCode"
          placeholder="비밀번호"
          submitBehavior="submit"
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          touched={signup.touched.password}
          error={signup.errors.password}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          secureTextEntry
          placeholder="비밀번호 확인"
          onSubmitEditing={handleSubmit}
          touched={signup.touched.passwordConfirm}
          error={signup.errors.passwordConfirm}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton
        label="회원가입"
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

export default SignupScreen;
