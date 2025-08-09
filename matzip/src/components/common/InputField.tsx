import {colors} from '@/constants/colors';
import React, {Ref} from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

interface InputFieldProps extends TextInputProps {
  ref?: Ref<TextInput>;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

function InputField({
  ref,
  error,
  touched,
  disabled = false,
  ...props
}: InputFieldProps) {
  return (
    <View>
      <TextInput
        ref={ref}
        placeholderTextColor={colors.GRAY_500}
        autoCapitalize="none"
        spellCheck={false}
        autoCorrect={false}
        style={[
          styles.input,
          disabled && styles.disabled,
          props.multiline && styles.multiLine,
          touched && Boolean(error) && styles.inputError,
        ]}
        editable={!disabled}
        {...props}
      />
      {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.BLACK,
  },
  multiLine: {
    height: 150,
    paddingVertical: 10,
    textAlignVertical: 'top',
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
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
});

export default InputField;
