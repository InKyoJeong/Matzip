import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';
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
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View>
      <TextInput
        ref={ref}
        placeholderTextColor={colors[theme].GRAY_500}
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

const styling = (theme: Theme) =>
  StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      justifyContent: 'center',
      height: 50,
      paddingHorizontal: 10,
      fontSize: 16,
      color: colors[theme].BLACK,
    },
    multiLine: {
      height: 150,
      paddingVertical: 10,
      textAlignVertical: 'top',
    },
    inputError: {
      borderWidth: 1,
      borderColor: colors[theme].RED_300,
    },
    error: {
      color: colors[theme].RED_500,
      fontSize: 12,
      paddingTop: 5,
    },
    disabled: {
      backgroundColor: colors[theme].GRAY_200,
      color: colors[theme].GRAY_700,
    },
  });

export default InputField;
