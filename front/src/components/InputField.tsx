import React, {useRef} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {colors} from '../constants';

interface InputFieldProps extends TextInputProps {
  error?: string;
  disabled?: boolean;
  touched?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

function InputField({
  error,
  touched,
  disabled = false,
  ...props
}: InputFieldProps) {
  const innerRef = useRef<TextInput | null>(null);

  const handlePressInput = () => {
    innerRef.current?.focus();
  };

  return (
    <Pressable onPress={handlePressInput}>
      <View
        style={[
          styles.container,
          props.multiline && styles.multiLine,
          disabled && styles.disabled,
          touched && Boolean(error) && styles.inputError,
        ]}>
        <TextInput
          ref={innerRef}
          style={[styles.input, disabled && styles.disabled]}
          autoCapitalize="none"
          placeholderTextColor={colors.GRAY_500}
          editable={!disabled}
          autoCorrect={false}
          spellCheck={false}
          {...props}
        />
        {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    paddingVertical: deviceHeight > 640 ? 15 : 10,
    paddingHorizontal: deviceHeight > 640 ? 15 : 10,
  },
  multiLine: {
    paddingBottom: deviceHeight > 640 ? 45 : 30,
  },
  input: {
    fontSize: 16,
    paddingVertical: 0,
    paddingLeft: 0,
    color: colors.BLACK,
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
    paddingLeft: 0,
  },
});

export default InputField;
