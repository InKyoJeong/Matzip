import React from 'react';
import {StyleSheet, TextInput, View, TextInputProps, Text} from 'react-native';
import {colors} from '../constants';

interface InputFieldProps extends TextInputProps {
  error?: string;
  touched?: boolean;
}

function InputField({error, touched, ...props}: InputFieldProps) {
  return (
    <View
      style={[
        styles.container,
        touched && Boolean(error) && styles.inputError,
      ]}>
      <TextInput
        placeholderTextColor={colors.GRAY_500}
        style={styles.input}
        {...props}
      />
      {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: 15,
  },
  input: {
    fontSize: 16,
    color: colors.BLACK,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});

export default InputField;
