import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import InputField from '../../components/InputField';

function LoginScreen() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleChangeEmail = (text: string) => {
  //   setEmail(text);
  // };

  // const handleChangePassword = (text: string) => {
  //   setPassword(text);
  // };

  const handleChangeText = (name: string, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  const handleBlur = (name: string) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          value={values.email}
          onChangeText={text => handleChangeText('email', text)}
          onBlur={() => handleBlur('email')}
          inputMode="email"
          returnKeyType="next"
          placeholder="이메일"
          error={'이메일 에러!'}
        />
        <InputField
          autoFocus
          value={values.password}
          onChangeText={text => handleChangeText('password', text)}
          onBlur={() => handleBlur('password')}
          returnKeyType="next"
          placeholder="비밀번호"
          error={'비밀번호 에러!'}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 30,
    marginBottom: 40,
  },
});

export default LoginScreen;
